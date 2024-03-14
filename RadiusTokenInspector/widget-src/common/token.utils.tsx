import { TokenUse } from "./token.types";

const { widget } = figma;
const { Text } = widget;
export type TokeTypeName =
  | "color"
  | "spacing"
  | "fontWeight"
  | "lineHeight"
  | "opacity"
  | "strokeWidth"
  | "borderWidth"
  | "borderRadius"
  | "animation";

export const tokenTypeNames: Array<TokeTypeName> = [
  "color",
  "spacing",
  "fontWeight",
  "lineHeight",
  "opacity",
  "strokeWidth",
  "borderWidth",
  "borderRadius",
  "animation",
];

const isTokenType = (t: unknown): t is TokeTypeName =>
  tokenTypeNames.indexOf(t as TokeTypeName) !== -1;

export const isCamelCase = (s: string) =>
  /^[a-z0-9]+(?:[A-Z][a-z0-9]*)*$/.test(s) && !/[A-Z]{2}/.test(s);

// TODO: move to tests after configuring vitest
// console.log(isCamelCase("test"));
// console.log(isCamelCase("test noveo"));
// console.log(isCamelCase("test_"));
// console.log(isCamelCase("Dstest"));
// console.log(isCamelCase("nodaSmellSa"));
// console.log(isCamelCase("nodaSSmellSa"));
// console.log(isCamelCase("NADA"));
// console.log(isCamelCase("t2est"));
// console.log(isCamelCase("2"));
// console.log(isCamelCase("2xl"));

export type TokenRule = {
  title: string;
  validate: (
    name: string
  ) => readonly [boolean, string] | readonly [boolean, string, string[]];
};

export const tokenRules: Record<string, TokenRule> = {
  "three-segments": {
    title: "token name must have at least three segments",
    validate: (name) =>
      name.match(/([^.]*)\.([^.]*)\.([^.]*)/)
        ? [true, ""]
        : [
            false,
            `Token ${name} does not have the mandatory three segments: layer, type and subject`,
          ],
  },
  "valid-case": {
    title: "token name segments must be in 'camelCase'",
    validate: (name) => {
      const segments = name.split(".");
      const invalidSegments = segments.filter((s) => !isCamelCase(s));
      return invalidSegments.length === 0
        ? [true, ""]
        : [
            false,
            `Token ${name} has segments with the worng format. Segments ${invalidSegments
              .map((s) => `'${s}'`)
              .join()} are not in camelCase.`,
            invalidSegments,
          ];
    },
  },
  "valid-type": {
    title: "token name must have a valid type",
    validate: (name) => {
      const [_, _subject, type, _attributes] =
        name.match(/([^.]*)\.([^.]*)\.([^.]*)/) ?? [];

      if (isTokenType(type)) return [true, ""];
      else {
        console.log(
          "ERROR:",
          [_subject, type, _attributes],
          `Token ${name} has an invalid type '${type}'. Valid types are: ${tokenTypeNames.join()}`
        );
        return [
          false,
          `Token ${name} has an invalid type '${type}'. Valid types are: ${tokenTypeNames.join()}`,
          [type],
        ];
      }
    },
  },
};

/// TODO: move this to a test file
// console.log("first.second.third".match(/([^.])*\.([^.])*\.([^.])*/));
//

export type TokenError = {
  key: string;
  title: string;
  message: string;
  segments: string[];
};

type ReturnTuple = [ok: boolean, errs: TokenError[]];

const RedSgmt: FunctionalWidget<TextProps & { onClick: () => void }> = ({
  children,
  onClick,
}) => (
  <Text
    name="red-text-segment"
    fill="#F00"
    fontFamily="Roboto Mono"
    fontSize={12}
    fontWeight={700}
    onClick={() => onClick()}
  >
    {children}
  </Text>
);

const Sgmt: FunctionalWidget<TextProps> = ({ children }) => (
  <Text name="text-segment" fill="#000" fontFamily="Roboto Mono" fontSize={12}>
    {children}
  </Text>
);

export const validateTokenName = (
  name: string,
  showErrors: (errs: TokenError[]) => void
): readonly [node: FigmaDeclarativeNode, ok: boolean, errs: TokenError[]] => {
  const printableName = name.replaceAll("/", ".");
  const [ok, errs] = Object.entries(tokenRules).reduce<ReturnTuple>(
    ([ok, errs], [key, rule]) => {
      const [valid, errMsg, segments] = rule.validate(printableName);
      return ok && valid
        ? [true, []]
        : [
            false,
            [
              ...errs,
              {
                key,
                title: rule.title,
                message: errMsg,
                segments: segments ?? [],
              } satisfies TokenError,
            ],
          ];
    },
    [true, []]
  );
  console.log(">", name, ok, errs);

  const errorsBySegment = errs.reduce((res, err) => {
    return {
      ...res,
      ...err.segments.reduce(
        (segmentIndex, segment) => ({
          ...segmentIndex,
          [segment]: [...(res[segment] ?? []), err],
        }),
        {} as Record<string, TokenError[]>
      ),
    };
  }, {} as Record<string, TokenError[]>);

  const segments = printableName.split(".");
  console.log(errorsBySegment);
  // TODO: inject render function from the outside to be able to create a nicer floating hint
  const renderedName = ok ? (
    <Sgmt>{printableName}</Sgmt>
  ) : (
    segments.flatMap((segment, index) => [
      errorsBySegment[segment] ? (
        <RedSgmt onClick={() => showErrors(errorsBySegment[segment])}>
          {segment}
        </RedSgmt>
      ) : (
        <Sgmt>{segment}</Sgmt>
      ),
      <Sgmt>{index < segments.length - 1 ? "." : ""}</Sgmt>,
    ])
  );
  return [renderedName, ok, errs] as const;
};

export const calculateSubjectsFromProps = (componentProps: TokenUse[]) =>
  componentProps.reduce((subjects, prop) => {
    const [_, subject, _type, _attributes] =
      prop.value.replaceAll("/", ".").match(/([^.]*)\.([^.]*)\.([^.]*)/) ?? [];
    console.log("SUBJECT", [subject, _type, _attributes], prop.value);
    if (!subject || subjects.indexOf(subject) !== -1) return subjects;
    else return [...subjects, subject];
  }, [] as string[]);
