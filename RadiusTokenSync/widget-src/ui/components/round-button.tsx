import { Icon16px, IconProps } from "./icon";

const { widget } = figma;
const { Text, AutoLayout } = widget;

export type RoundButtonProps = {
  variant?: "default" | "disabled";
} & BaseProps &
  TextChildren &
  IconProps;

const colorScheme = {
  default: ["#232323", "#FFFFFF"],
  disabled: ["#e7e7e7", "#808080"],
};

export const RoundButton: FunctionalWidget<RoundButtonProps> = ({
  children,
  variant = "default",
  icon,
  ...props
}) => {
  const [bg, fg] = colorScheme[variant];
  return (
    <AutoLayout
      name="RoundButton"
      fill={bg}
      cornerRadius={69}
      overflow="visible"
      spacing={8}
      padding={{
        vertical: 8,
        horizontal: 24,
      }}
      width="hug-contents"
      height="hug-contents"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      {...props}
    >
      <AutoLayout
        name="LabelGroup"
        overflow="visible"
        spacing={8}
        verticalAlignItems="center"
      >
        <Icon16px icon={icon} size={16} color={fg} />
        <Text
          name="Button Label"
          fill={fg}
          verticalAlignText="center"
          horizontalAlignText="center"
          lineHeight="150%"
          fontFamily="Roboto"
          fontSize={14}
          fontWeight={700}
        >
          {children}
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
};
