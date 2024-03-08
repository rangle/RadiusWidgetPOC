const { widget } = figma;
const { Text, AutoLayout } = widget;
import { TokenUse } from "../common/token.types";

export type PropUsage = {
  prop: TokenUse;
};
export const PropDocs: FunctionalWidget<PropUsage> = ({ prop }) => {
  return (
    <AutoLayout
      name={`prop:${prop.name}`}
      spacing={6}
      verticalAlignItems="center"
    >
      <Text name="fill:" fill="#000" fontFamily="Roboto Mono" fontSize={12}>
        {prop.name}:
      </Text>
      <AutoLayout
        name="Frame 6"
        fill="#D3E6FF"
        cornerRadius={6}
        overflow="visible"
        spacing={10}
        padding={{
          vertical: 4,
          horizontal: 6,
        }}
        verticalAlignItems="center"
      >
        <Text
          name="color.button.primary.default"
          fill="#1A1A1A"
          fontFamily="Roboto Mono"
          fontSize={12}
        >
          {prop.value.replaceAll("/", ".")}
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
};
