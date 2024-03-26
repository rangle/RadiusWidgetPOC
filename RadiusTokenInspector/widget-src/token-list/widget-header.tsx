import { Button } from "./button";
import { Icon16px } from "./icon";

const { widget } = figma;
const { Text, AutoLayout } = widget;

export type WidgetHeaderProps = {
  loaded: boolean;
  addVariants: () => void;
};

export const WidgetHeader = ({
  loaded: node,
  addVariants,
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
      {node ? (
        <>
          <AutoLayout
            name="button"
            fill="#000"
            overflow="visible"
            padding={{
              vertical: 4,
              horizontal: 6,
            }}
            horizontalAlignItems="center"
            verticalAlignItems="center"
          >
            <Button icon="refresh" onClick={() => addVariants()}>
              Replace Component
            </Button>
          </AutoLayout>
        </>
      ) : (
        <AutoLayout
          name="button"
          fill="#000"
          overflow="visible"
          padding={{
            vertical: 4,
            horizontal: 6,
          }}
          horizontalAlignItems="center"
          verticalAlignItems="center"
        >
          <Button icon="add-box" onClick={() => addVariants()}>
            Inspect Component
          </Button>
        </AutoLayout>
      )}
    </AutoLayout>
  );
};
