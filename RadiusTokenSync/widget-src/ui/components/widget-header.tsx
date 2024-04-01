import { Button } from "./button";
import { Icon16px } from "./icon";
import { NameFormat } from "./name-format";

const { widget } = figma;
const { Text, AutoLayout } = widget;

export type WidgetHeaderProps = BaseProps & HasChildrenProps;

export const WidgetHeader = ({ children, ...props }: WidgetHeaderProps) => {
  return (
    <AutoLayout
      name="Widget-Header"
      overflow="visible"
      spacing="auto"
      width="fill-parent"
      direction="vertical"
      {...props}
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
        <AutoLayout direction="vertical">{children}</AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
};
