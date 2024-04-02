import { Icon16px } from "./icon";

const { widget } = figma;
const { Text, AutoLayout, Frame, SVG } = widget;

export const NameFormat = () => {
  return (
    <AutoLayout
      name="FormatGroup"
      spacing={8}
      verticalAlignItems="center"
      width="hug-contents"
    >
      <AutoLayout
        name="FormatRow"
        spacing={8}
        verticalAlignItems="center"
        width="hug-contents"
      >
        <Text
          name="Format:"
          fill="#262626"
          lineHeight="140%"
          fontFamily="Helvetica"
          fontSize={12}
          letterSpacing={0.24}
        >
          Format:
        </Text>
        <AutoLayout
          name="FormatBullet"
          stroke="#EFEFEF"
          cornerRadius={16}
          height={24}
          verticalAlignItems="center"
        >
          <AutoLayout
            name="Spacer"
            fill="#FFF"
            overflow="visible"
            spacing={10}
            padding={{
              vertical: 4,
              horizontal: 8,
            }}
            width={4}
            verticalAlignItems="center"
          />
          <AutoLayout
            name="TokenType"
            fill="#FFF"
            overflow="visible"
            spacing={4}
            padding={4}
            verticalAlignItems="center"
          >
            <Icon16px icon="variables" />
          </AutoLayout>
          <AutoLayout
            name="Layer"
            fill="#EFEFEF"
            overflow="visible"
            spacing={4}
            padding={4}
            height="fill-parent"
            verticalAlignItems="center"
          >
            <Text
              name="layer"
              fill="#262626"
              verticalAlignText="center"
              fontFamily="Roboto Mono"
              fontSize={12}
            >
              layer
            </Text>
          </AutoLayout>
          <AutoLayout
            name="Dot"
            fill="#FFF"
            overflow="visible"
            spacing={4}
            padding={{
              vertical: 4,
              horizontal: 0,
            }}
            height="fill-parent"
            verticalAlignItems="center"
          >
            <Text
              name="."
              fill="#262626"
              verticalAlignText="center"
              fontFamily="Roboto Mono"
              fontSize={12}
            >
              .
            </Text>
          </AutoLayout>
          <AutoLayout
            name="Subject"
            fill="#F8FBD2"
            overflow="visible"
            spacing={4}
            padding={4}
            height="fill-parent"
            verticalAlignItems="center"
          >
            <Text
              name="subject"
              fill="#262626"
              verticalAlignText="center"
              fontFamily="Roboto Mono"
              fontSize={12}
            >
              subject
            </Text>
          </AutoLayout>
          <AutoLayout
            name="Dot"
            fill="#FFF"
            overflow="visible"
            spacing={4}
            padding={{
              vertical: 4,
              horizontal: 0,
            }}
            height="fill-parent"
            verticalAlignItems="center"
          >
            <Text
              name="."
              fill="#262626"
              verticalAlignText="center"
              fontFamily="Roboto Mono"
              fontSize={12}
            >
              .
            </Text>
          </AutoLayout>
          <AutoLayout
            name="Type"
            fill="#E9F3FF"
            overflow="visible"
            spacing={4}
            padding={4}
            height="fill-parent"
            verticalAlignItems="center"
          >
            <Text
              name="type"
              fill="#262626"
              verticalAlignText="center"
              fontFamily="Roboto Mono"
              fontSize={12}
            >
              type
            </Text>
          </AutoLayout>
          <AutoLayout
            name="Dot"
            fill="#FFF"
            overflow="visible"
            spacing={4}
            padding={{
              vertical: 4,
              horizontal: 0,
            }}
            height="fill-parent"
            verticalAlignItems="center"
          >
            <Text
              name="."
              fill="#262626"
              verticalAlignText="center"
              fontFamily="Roboto Mono"
              fontSize={12}
            >
              .
            </Text>
          </AutoLayout>
          <AutoLayout
            name="Attributes"
            fill="#FFF0FE"
            overflow="visible"
            spacing={4}
            padding={4}
            height="fill-parent"
            verticalAlignItems="center"
          >
            <Text
              name="attributes"
              fill="#262626"
              verticalAlignText="center"
              fontFamily="Roboto Mono"
              fontSize={12}
            >
              attributes
            </Text>
          </AutoLayout>
          <AutoLayout
            name="Spacer"
            fill="#FFF0FE"
            overflow="visible"
            spacing={4}
            padding={{
              vertical: 4,
              horizontal: 0,
            }}
            height={32}
            verticalAlignItems="center"
          />
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
};
