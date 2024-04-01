const { widget } = figma;
const { AutoLayout, Text } = widget;

import URL from "url-parse";

import { WidgetHeader } from "../components/widget-header";
import { BottomLogo } from "../components/bottom-logo";
import { NameFormat } from "../components/name-format";
import { Button } from "../components/button";
import { Icon16px } from "../components/icon";
import { RepositoryTokenLayers } from "../../services/load-github.services";
import { CommitRibbon } from "../components/commit-ribbon";

type EmptyPageProps = {
  loaded: boolean;
  name: string;
  error: string | null;
  lastLoaded: string | null;
  openConfig: () => void;
  synchDetails: RepositoryTokenLayers | null;
  synchronize?: () => void;
};

export const EmptyPage = ({
  loaded,
  name,
  error,
  lastLoaded,
  synchDetails,
  openConfig,
  synchronize,
}: EmptyPageProps) => {
  const synchMetadata = synchDetails && synchDetails[2];

  return (
    <AutoLayout
      name="WidgetFrame"
      effect={{
        type: "drop-shadow",
        color: "#00000040",
        offset: {
          x: 0,
          y: 4,
        },
        blur: 4,
        showShadowBehindNode: false,
      }}
      fill="#F6F6F6"
      stroke="#858585"
      cornerRadius={6}
      direction="vertical"
      spacing={6}
      padding={6}
    >
      <WidgetHeader>
        {!loaded ? (
          <Button icon="github" onClick={() => openConfig()}>
            Configure
          </Button>
        ) : (
          <AutoLayout direction="vertical">
            <AutoLayout direction="horizontal">
              <Icon16px icon="github" />
              <Text paragraphIndent={6} fontSize={14}>
                {name}
              </Text>
            </AutoLayout>
            <AutoLayout direction="horizontal" padding={2} spacing={12}>
              <AutoLayout
                verticalAlignItems="center"
                onClick={() => openConfig()}
              >
                <Icon16px icon="gear" size={12} />
                <Text fontSize={9}>configure</Text>
              </AutoLayout>
              <AutoLayout verticalAlignItems="center" onClick={synchronize}>
                <Icon16px icon="refresh" size={12} />
                <Text fontSize={9}>Refresh</Text>
              </AutoLayout>
              <AutoLayout
                verticalAlignItems="center"
                onClick={() => openConfig()}
              >
                <Icon16px icon="clock" size={12} />
                <Text fontSize={9}>last refresh: </Text>
                <Text fontSize={9}>{lastLoaded ?? "N/A"}</Text>
              </AutoLayout>
            </AutoLayout>
          </AutoLayout>
        )}
      </WidgetHeader>
      {error && (
        <AutoLayout
          cornerRadius={6}
          padding={6}
          spacing={6}
          direction="vertical"
          fill="#fff"
        >
          <Text fontSize={12} fill={"#ff0000"}>
            {error}
          </Text>
        </AutoLayout>
      )}
      {synchMetadata && (
        <CommitRibbon
          name={synchMetadata.name}
          avatarUrl={synchMetadata.lastCommits?.[0].autor_avatar_url}
          commitMessage={synchMetadata.lastCommits?.[0].message}
          dateTime={synchMetadata.lastCommits?.[0].author.date}
          userName={synchMetadata.lastCommits?.[0].author.name}
          version={synchMetadata.version}
        />
      )}
      <AutoLayout
        cornerRadius={12}
        padding={16}
        spacing={16}
        direction="vertical"
        fill="#fff"
      >
        <NameFormat />
        {loaded ? (
          <AutoLayout
            cornerRadius={12}
            padding={16}
            horizontalAlignItems="center"
            direction="horizontal"
          >
            <Button
              icon="refresh"
              onClick={() => {
                console.log("THIS IS IT!");
                const url = new URL("http://teste.com/path/to/file?query=234");
                console.log(url.pathname);
              }}
            >
              Load tokens and variables
            </Button>
          </AutoLayout>
        ) : (
          <AutoLayout
            cornerRadius={12}
            padding={16}
            horizontalAlignItems="center"
            direction="horizontal"
          >
            <Text>please, configure Github to continue</Text>
          </AutoLayout>
        )}
      </AutoLayout>
      <AutoLayout direction="horizontal" padding={16}>
        <BottomLogo />
      </AutoLayout>
    </AutoLayout>
  );
};
