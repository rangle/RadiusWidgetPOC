import { Button } from "./button";
import { Icon16px } from "./icon";
import { NameFormat } from "./name-format";

const { widget } = figma;
const { Text, AutoLayout } = widget;

export type WidgetHeaderProps = {
  loaded: boolean;
  lastLoaded?: string;
  addVariants: () => void;
  resetComponents?: () => void;
};

export const WidgetHeader = ({
  loaded,
  lastLoaded,
  addVariants,
  resetComponents,
}: WidgetHeaderProps) => {
  console.log("lastLoaded", lastLoaded);
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
        width="fill-parent"
        direction="horizontal"
      >
        <AutoLayout name="Widget-title" spacing={6} verticalAlignItems="center">
          <Icon16px icon="radius" />
          <Text
            name="Radius Token Inspector"
            fill="#030303"
            fontFamily="Roboto Condensed"
            fontWeight={700}
          >
            Radius Token Inspector
          </Text>
        </AutoLayout>
        {loaded ? (
          <>
            {resetComponents && (
              <Button icon="close" onClick={() => resetComponents()}>
                Reset
              </Button>
            )}
          </>
        ) : (
          <Button icon="add-box" onClick={() => addVariants()}>
            Inspect Selected Component
          </Button>
        )}
      </AutoLayout>
      <AutoLayout direction="horizontal" width="fill-parent" spacing="auto">
        <NameFormat />
        {<Text>{lastLoaded ?? ""}</Text>}
      </AutoLayout>
    </AutoLayout>
  );
};
