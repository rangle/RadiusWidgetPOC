import { Icon16px, IconProps } from "./icon";

const { widget } = figma;
const { Text, AutoLayout } = widget;

export type ButtonProps = BaseProps & TextChildren & IconProps;

export const Button: FunctionalWidget<ButtonProps> = ({
  children,
  icon,
  ...props
}) => (
  <AutoLayout
    name="button"
    fill="#262626"
    overflow="visible"
    padding={{
      vertical: 4,
      horizontal: 6,
    }}
    horizontalAlignItems="center"
    verticalAlignItems="center"
    {...props}
  >
    <AutoLayout name="label" spacing={8}>
      <Text
        name="Button Label"
        fill="#fff"
        verticalAlignText="center"
        horizontalAlignText="center"
        lineHeight="150%"
        fontFamily="Roboto Condensed"
        fontSize={12}
        fontWeight={500}
      >
        {children}
      </Text>
      <Icon16px icon={icon} color="#fff" />
    </AutoLayout>
  </AutoLayout>
);
