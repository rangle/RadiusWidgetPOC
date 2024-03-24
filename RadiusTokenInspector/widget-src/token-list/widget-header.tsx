import { Button } from "./button";
import { Icon16px } from "./icon";

const { widget } = figma;
const { Text, AutoLayout } = widget;

export type WidgetHeaderProps = {
  loaded: boolean;
  addComponent: () => void;
  addVariants: () => void;
  resetComponents: () => void;
};

export const WidgetHeader = ({
  loaded: node,
  addComponent,
  addVariants,
  resetComponents,
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
            fill={{
              opacity: 0,
              type: "solid",
              color: {
                r: 0,
                g: 0,
                b: 0,
                a: 1,
              },
            }}
            stroke="#262626"
            overflow="visible"
            padding={{
              vertical: 4,
              horizontal: 6,
            }}
            horizontalAlignItems="center"
            verticalAlignItems="center"
          >
            <Button icon="refresh" onClick={() => addComponent()}>
              Replace Component
            </Button>
          </AutoLayout>
          <AutoLayout
            name="button"
            fill={{
              opacity: 0,
              type: "solid",
              color: {
                r: 0,
                g: 0,
                b: 0,
                a: 1,
              },
            }}
            stroke="#262626"
            overflow="visible"
            padding={{
              vertical: 4,
              horizontal: 6,
            }}
            horizontalAlignItems="center"
            verticalAlignItems="center"
          >
            <Button icon="close" onClick={() => resetComponents()}>
              Reset
            </Button>
          </AutoLayout>
        </>
      ) : (
        <AutoLayout
          name="button"
          fill={{
            opacity: 0,
            type: "solid",
            color: {
              r: 0,
              g: 0,
              b: 0,
              a: 1,
            },
          }}
          stroke="#262626"
          overflow="visible"
          padding={{
            vertical: 4,
            horizontal: 6,
          }}
          horizontalAlignItems="center"
          verticalAlignItems="center"
        >
          <Button icon="add-box" onClick={() => addComponent()}>
            Add Component
          </Button>
          <Button icon="add-box" onClick={() => addVariants()}>
            Add All Variants
          </Button>
        </AutoLayout>
      )}
    </AutoLayout>
  );
};
