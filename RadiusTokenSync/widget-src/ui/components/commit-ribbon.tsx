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
    fill="#ccc"
    cornerRadius={4}
    overflow="visible"
    direction="horizontal"
    spacing="auto"
    padding={{
      vertical: 2,
      horizontal: 4,
    }}
    {...props}
  >
    <Image src={avatarUrl} height={16} width={16} />
    <Text name="user" fill="#222" fontFamily="Roboto Mono" fontSize={12}>
      {userName}
    </Text>
    <Text name="message" fill="#999" fontFamily="Roboto Mono" fontSize={9}>
      {commitMessage}
    </Text>
    <Text name="date" fill="#666" fontFamily="Roboto Mono" fontSize={9}>
      {dateTime}
    </Text>
    <Text name="user" fill="#000" fontFamily="Roboto Mono" fontSize={12}>
      {name}
    </Text>
    <Text name="version" fill="#f99" fontFamily="Roboto Mono" fontSize={12}>
      {version}
    </Text>
  </AutoLayout>
);
