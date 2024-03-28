const { widget } = figma;
const { Text, AutoLayout } = widget;

export const NameFormat = () => {
  return (
    <AutoLayout
      name="FormatGroup"
      fill="#FFF"
      cornerRadius={6}
      overflow="visible"
      spacing={4}
      padding={{
        vertical: 2,
        horizontal: 4,
      }}
      verticalAlignItems="center"
    >
      <Text name="format:" fill="#000" fontFamily="Roboto Mono" fontSize={10}>
        format:
      </Text>
      <AutoLayout
        name="subject-group"
        fill="#AAA"
        cornerRadius={6}
        spacing={6}
        padding={{
          vertical: 2,
          horizontal: 4,
        }}
        verticalAlignItems="center"
      >
        <AutoLayout
          name="Subject-pill"
          fill="#FFF"
          cornerRadius={6}
          overflow="visible"
          spacing={10}
          padding={{
            vertical: 2,
            horizontal: 4,
          }}
          verticalAlignItems="center"
        >
          <Text
            name="layer"
            fill="#1A1A1A"
            fontFamily="Roboto Mono"
            fontSize={10}
          >
            layer
          </Text>
        </AutoLayout>
      </AutoLayout>
      <AutoLayout
        name="subject-group"
        fill="#C6EFC4"
        cornerRadius={6}
        spacing={6}
        padding={{
          vertical: 2,
          horizontal: 4,
        }}
        verticalAlignItems="center"
      >
        <AutoLayout
          name="Subject-pill"
          fill="#FFF"
          cornerRadius={6}
          overflow="visible"
          spacing={10}
          padding={{
            vertical: 2,
            horizontal: 4,
          }}
          verticalAlignItems="center"
        >
          <Text
            name="subject"
            fill="#1A1A1A"
            fontFamily="Roboto Mono"
            fontSize={10}
          >
            subject
          </Text>
        </AutoLayout>
      </AutoLayout>
      <AutoLayout
        name="subject-group"
        fill="#117DF9"
        cornerRadius={6}
        spacing={6}
        padding={{
          vertical: 2,
          horizontal: 4,
        }}
        verticalAlignItems="center"
      >
        <AutoLayout
          name="Subject-pill"
          fill="#FFF"
          cornerRadius={6}
          overflow="visible"
          spacing={10}
          padding={{
            vertical: 2,
            horizontal: 4,
          }}
          verticalAlignItems="center"
        >
          <Text
            name="type"
            fill="#1A1A1A"
            fontFamily="Roboto Mono"
            fontSize={10}
          >
            type
          </Text>
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
};
