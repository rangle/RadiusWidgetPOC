const { widget } = figma;
const { AutoLayout, Text } = widget;

import { WidgetHeader } from "../components/widget-header";
import { BottomLogo } from "../components/bottom-logo";
import { NameFormat } from "../components/name-format";

type LoadedPageProps = {
  loaded: boolean;
  name: string;
  openConfig: () => void;
  lastLoaded?: string;
  remoteVersion?: string;
  synchronize?: () => void;
};

export const LoadedPage = ({
  loaded,
  name,
  lastLoaded,
  remoteVersion,
  openConfig,
  synchronize,
}: LoadedPageProps) => {
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
      spacing={12}
      padding={12}
    >
      <WidgetHeader
        loaded={loaded}
        name={name}
        lastLoaded={lastLoaded}
        remoteVersion={remoteVersion}
        openConfig={openConfig}
        synchronize={synchronize}
      />
      <AutoLayout
        cornerRadius={12}
        padding={16}
        spacing={16}
        direction="vertical"
        fill="#fff"
      >
        <NameFormat />
        <AutoLayout fill="">
          <Text>please, configure Github to continue</Text>
        </AutoLayout>
      </AutoLayout>
      <AutoLayout direction="horizontal">
        <BottomLogo />
      </AutoLayout>
    </AutoLayout>
  );
};
