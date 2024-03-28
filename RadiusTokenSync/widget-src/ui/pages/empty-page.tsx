const { widget } = figma;
const { AutoLayout, Text } = widget;

import { WidgetHeader } from "../components/widget-header";
import { BottomLogo } from "../components/bottom-logo";

type EmptyPageProps = {
  openConfig: () => void;
};

export const EmptyPage = ({ openConfig }: EmptyPageProps) => {
  return (
    <AutoLayout
      name="WidgetFrame"
      effect={{
        type: "drop-shadow",
        color: "#00000040",
        offset: {
          x: 0,
          y: 4,
        },
        blur: 4,
        showShadowBehindNode: false,
      }}
      fill="#F6F6F6"
      stroke="#858585"
      cornerRadius={6}
      direction="vertical"
      spacing={6}
      padding={12}
    >
      <WidgetHeader loaded={false} openConfig={openConfig} />
      <Text>please, configure Github to continue</Text>
      <AutoLayout direction="horizontal">
        <BottomLogo />
      </AutoLayout>
    </AutoLayout>
  );
};
