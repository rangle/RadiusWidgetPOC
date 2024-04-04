const { widget } = figma;
const { Text, AutoLayout, Image } = widget;

export type CommitRibbonProps = BaseProps & {
  name: string;
  avatarUrl: string;
  userName: string;
  commitMessage: string;
  version: string;
  dateTime: string;
};

export const CommitRibbon: FunctionalWidget<CommitRibbonProps> = ({
  name,
  avatarUrl,
  userName,
  commitMessage,
  version,
  dateTime,
  ...props
}) => (
  <AutoLayout
    name="CommitRibbon"
    fill="#161B22"
    cornerRadius={6}
    overflow="visible"
    spacing={12}
    padding={{
      vertical: 8,
      horizontal: 10,
    }}
    horizontalAlignItems="center"
    verticalAlignItems="center"
    {...props}
  >
    <AutoLayout
      name="User"
      overflow="visible"
      spacing={6}
      horizontalAlignItems="center"
      verticalAlignItems="center"
    >
      <Image name="Rectangle" width={16} height={16} src={avatarUrl} />
      <Text name="user" fill="#E6EDF3" fontFamily="Roboto Mono" fontSize={10}>
        {userName}
      </Text>
    </AutoLayout>
    <AutoLayout
      name="Envelope"
      overflow="visible"
      direction="vertical"
      spacing={10}
      minWidth={350}
      verticalAlignItems="center"
      horizontalAlignItems="center"
    >
      <AutoLayout
        name="Message"
        overflow="hidden"
        spacing={6}
        width="fill-parent"
        horizontalAlignItems="center"
        verticalAlignItems="center"
      >
        <Text
          name="message"
          fill="#848D97"
          width="fill-parent"
          fontFamily="Roboto Mono"
          fontSize={9}
        >
          {commitMessage}
        </Text>
        <Text name="date" fill="#E9F3FF" fontFamily="Roboto Mono" fontSize={9}>
          {dateTime}
        </Text>
      </AutoLayout>
    </AutoLayout>
    <AutoLayout
      name="Version"
      overflow="visible"
      spacing={6}
      horizontalAlignItems="center"
      verticalAlignItems="center"
    >
      <Text name="package" fill="#FFF" fontFamily="Roboto Mono" fontSize={12}>
        {name}
      </Text>
      <Text
        name="version"
        fill="#E9F3FF"
        fontFamily="Roboto Mono"
        fontSize={12}
      >
        {version}
      </Text>
    </AutoLayout>
  </AutoLayout>
);
