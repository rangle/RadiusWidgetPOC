import { Button } from "./button";
import { Icon16px } from "./icon";
import { NameFormat } from "./name-format";

const { widget } = figma;
const { Text, AutoLayout } = widget;

export type WidgetHeaderProps = {
  loaded: boolean;
  lastLoaded?: string;
  remoteVersion?: string;
  openConfig: () => void;
  synchronize?: () => void;
};

export const WidgetHeader = ({
  loaded,
  lastLoaded,
  remoteVersion,
  openConfig,
  synchronize,
}: WidgetHeaderProps) => {
  return (
    <AutoLayout
      name="Widget-Header"
      overflow="visible"
      spacing="auto"
      padding={{
        vertical: 6,
        horizontal: 3,
      }}
      width="fill-parent"
      direction="vertical"
    >
      <AutoLayout
        spacing="auto"
        padding={{
          vertical: 6,
          horizontal: 3,
        }}
        width="hug-contents"
        direction="horizontal"
      >
        <AutoLayout
          name="Widget-title"
          spacing={6}
          verticalAlignItems="center"
          width="hug-contents"
        >
          <Icon16px icon="radius" />
          <Text
            name="Radius Token Inspector"
            fill="#030303"
            fontFamily="Roboto Condensed"
            fontWeight={700}
          >
            Radius Token Synchronizer
          </Text>
        </AutoLayout>
        {loaded ? (
          <>
            {synchronize && (
              <Button icon="close" onClick={() => synchronize()}>
                Reset
              </Button>
            )}
          </>
        ) : (
          <Button icon="github" onClick={() => openConfig()}>
            Configure
          </Button>
        )}
      </AutoLayout>
      <AutoLayout direction="horizontal" width="fill-parent" spacing="auto">
        <NameFormat />
        {remoteVersion && (
          <>
            <Text fontSize={10}>Remote version</Text>
            <Text fontWeight={900}>{remoteVersion}</Text>
          </>
        )}
      </AutoLayout>
      <AutoLayout direction="horizontal" width="fill-parent" spacing="auto">
        {lastLoaded && (
          <>
            <Text fontSize={10}>Last Synched</Text>
            <Text fontWeight={300}>{lastLoaded}</Text>
          </>
        )}
      </AutoLayout>
    </AutoLayout>
  );
};
