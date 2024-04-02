import { join } from "path-browserify";
import {
  GithubOptions,
  createGithubRepositoryClient,
  GithubClient,
  isPackageJSON,
} from "../common/github.utils";

/**
 * Formats the relative path of a package.json file based on the provided options and packageJson
 * @param options - The GithubOptions object containing the necessary credentials and branch information.
 * @param packageJsonPath - The path to the package.json file.
 * @returns The formatted relative path of the package.json file.
 */
export const formatPackageJsonRelativePath = (
  options: GithubOptions,
  packageJsonPath: string | undefined
) => {
  if (!packageJsonPath) return undefined;
  const branchPrefix = join(options.credentials.repoFullName, options.branch);
  const packageJsonFullPath = join(packageJsonPath ?? "", "package.json");
  const packageJsonRelativePath = packageJsonFullPath?.replace(
    branchPrefix,
    ""
  );
  return packageJsonRelativePath;
};

/**
 * Retrieves the package.json file from the GitHub repository.
 *
 * @param client - The GitHub client.
 * @param options - The GitHub options.
 * @returns A tuple containing the package.json object, token file, and the relative path to the package.json file.
 * @throws An error if the package.json file cannot be found or if there is a problem reading it.
 */
const getPackageJson = async (client: GithubClient, options: GithubOptions) => {
  console.log(">>", "getPackageJson 1");
  const [tokenFile, packageJsonLocation, packageJsonPath] =
    await client.getFileInPreviousPath(options.tokenFilePath, "package.json");
  console.log(">>", "getPackageJson 2");
  if (!packageJsonLocation)
    throw new Error("Cannot find package.json in the repository");
  const packageJsonRelativePath = formatPackageJsonRelativePath(
    options,
    packageJsonPath
  );
  const packageResponse = await client.fetchRawFile(packageJsonLocation);
  if (!packageResponse.ok)
    throw new Error("Problem occurred while trying to read package.json");

  const packagejson = await packageResponse.json();
  if (!isPackageJSON(packagejson)) return [undefined, tokenFile] as const;
  return [packagejson, tokenFile, packageJsonRelativePath] as const;
};

/**
 * fetch latest version of foundations and tokens from github
 * @param options - The options for fetching the token layers.
 * @returns A tuple containing the token layers, package.json, and metadata.
 */
export const fetchRepositoryTokenLayers = async (options: GithubOptions) => {
  console.log("fetchRepositoryTokenLayers 1");
  const client = createGithubRepositoryClient(options.credentials);
  console.log("fetchRepositoryTokenLayers 2");
  const [packagejson, tokenFile] = await getPackageJson(client, options);
  console.log("fetchRepositoryTokenLayers 3");

  const lastCommitsFromRepo = await client.getLastCommitByPath(tokenFile.path);
  console.log("fetchRepositoryTokenLayers 4");
  const lastCommits = lastCommitsFromRepo.map(
    ({
      commit: { author, committer, message },
      sha,
      author: { avatar_url: autor_avatar_url },
      committer: { avatar_url: commiter_avatar_url },
    }) => ({
      sha,
      message,
      author,
      committer,
      autor_avatar_url,
      commiter_avatar_url,
    })
  );

  const tokenFileContent = Buffer.from(
    tokenFile.content,
    tokenFile.encoding
  ).toString();

  const [name, version] = [
    packagejson?.name ?? "---",
    packagejson?.version ?? "0.0.0",
  ] as const;

  const meta = {
    name,
    version,
    lastCommits,
  };

  // TODO: add proper typeguard of file
  const tokenLayers = JSON.parse(tokenFileContent);
  return [tokenLayers, packagejson, meta] as const;
};

export type RepositoryTokenLayers = ReturnType<
  typeof fetchRepositoryTokenLayers
> extends Promise<infer T>
  ? T
  : never;

/**
 * Saves the repository token layers and increments the package.json version.
 * @param options - The GithubOptions object containing the credentials and branch information.
 * @param tokenLayers - The object representing the token layers to be saved.
 * @param message - The commit message.
 */
export const saveRepositoryTokenLayers = async (
  options: GithubOptions,
  tokenLayers: object,
  message: string,
  destinationBranch?: string
) => {
  const client = createGithubRepositoryClient(options.credentials);

  const [packagejson, _, packageJsonPath] = await getPackageJson(
    client,
    options
  );

  const packageVersion = packagejson?.version ?? "0.0.0";

  const [major, minor, build] = packageVersion.split(".").map(Number);

  // increment minor version if above v1.0, or build verson if below
  const numVersion =
    major > 0 ? [major, minor + 1, 0] : [major, minor, build + 1];

  client.createCommit(
    options.branch,
    message,
    [
      // token file
      {
        encoding: "utf-8",
        path: options.tokenFilePath,
        content: JSON.stringify(tokenLayers, undefined, 2),
      },
      // increment package.json version
      ...(packageJsonPath && packagejson
        ? [
            {
              encoding: "utf-8",
              path: packageJsonPath,
              content: JSON.stringify(
                {
                  ...packagejson,
                  version: numVersion.join("."),
                },
                undefined,
                2
              ),
            },
          ]
        : []),
    ],
    destinationBranch
  );
};