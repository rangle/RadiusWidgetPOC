const { widget } = figma;
const { Text, AutoLayout } = widget;

export type WidgetHeaderProps = {
  inspect: () => void;
};

export const WidgetHeader = ({ inspect }: WidgetHeaderProps) => {
  return (
    <AutoLayout
      name="Widget Header"
      overflow="visible"
      spacing="auto"
      padding={{
        vertical: 6,
        horizontal: 3,
      }}
      width="fill-parent"
    >
      <AutoLayout
        name="Widget-title"
        direction="vertical"
        spacing={6}
        verticalAlignItems="center"
      >
        <Text
          name="Radius Token Inspector"
          fill="#030303"
          fontFamily="Roboto Mono"
          fontSize={14}
          fontWeight={700}
        >
          Radius Token Inspector
        </Text>
      </AutoLayout>
      <AutoLayout
        name="Widget-link"
        direction="vertical"
        spacing={6}
        verticalAlignItems="center"
      >
        <Text
          name="select"
          fill="#117DF9"
          horizontalAlignText="right"
          fontFamily="Roboto Mono"
          fontSize={12}
          fontWeight={700}
          onClick={() => inspect()}
        >
          inspect selection
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
};
