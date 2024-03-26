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
    name="label"
    overflow="visible"
    spacing={8}
    horizontalAlignItems="center"
    verticalAlignItems="center"
    {...props}
  >
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
);
