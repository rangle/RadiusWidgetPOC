import { ComponentUsage } from "../common/token.types";
import { calculateSubjectsFromProps } from "../common/token.utils";
import { Icon16px, IconProps } from "./icon";
import { Pill } from "./pill";

const { widget } = figma;
const { Text, AutoLayout, Frame, SVG, IconDefault } = widget;

export function WidgetCard() {
  const usage: ComponentUsage = {} as unknown as ComponentUsage;
  const { id, name, props } = usage;
  const isChildren = false;
  const subjects = calculateSubjectsFromProps(props);
  const [componentIcon, titleTextSize]: [IconProps["icon"], number] = isChildren
    ? ["figma", 20]
    : ["github", 14];
  return (
    <AutoLayout
      name="WidgetCard"
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
      <AutoLayout
        name="Widget-Header"
        overflow="visible"
        spacing="auto"
        padding={{
          vertical: 6,
          horizontal: 3,
        }}
        width="fill-parent"
      >
        <AutoLayout name="Widget-title" spacing={6} verticalAlignItems="center">
          <Icon16px icon="figma" />
          <Text
            name="Radius Token Inspector"
            fill="#030303"
            fontFamily="Roboto Condensed"
            fontWeight={700}
          >
            Radius Token Inspector
          </Text>
        </AutoLayout>
        <AutoLayout
          name="button"
          fill={{
            opacity: 0,
            type: "solid",
            color: {
              r: 0,
              g: 0,
              b: 0,
              a: 1,
            },
          }}
          stroke="#262626"
          overflow="visible"
          padding={{
            vertical: 4,
            horizontal: 6,
          }}
          horizontalAlignItems="center"
          verticalAlignItems="center"
        >
          <Button>Add Component</Button>
        </AutoLayout>
      </AutoLayout>
      <AutoLayout
        name="Component-Frame"
        overflow="visible"
        direction="vertical"
        padding={{
          top: 6,
          right: 3,
          bottom: 6,
          left: 0,
        }}
      >
        <AutoLayout
          name="Component-Header"
          stroke={[
            {
              type: "solid",
              color: {
                r: 0.5208333134651184,
                g: 0.5208333134651184,
                b: 0.5208333134651184,
                a: 1,
              },
            },
            {
              opacity: 0.2,
              type: "solid",
              color: {
                r: 0,
                g: 0,
                b: 0,
                a: 1,
              },
            },
          ]}
          strokeWidth={0}
          overflow="visible"
          spacing="auto"
          width="fill-parent"
          height={32}
          verticalAlignItems="center"
          strokeDashPattern={[2, 2]}
        >
          <AutoLayout
            name="Title"
            overflow="visible"
            spacing={10}
            verticalAlignItems="center"
          >
            <Icon16px icon={componentIcon} />
            <Text
              name="Component-title"
              fill="#030303"
              fontSize={titleTextSize}
              fontWeight={700}
            >
              {name}
            </Text>
            <Icon16px icon="close" onClick={() => deleteComponent(id)} />
          </AutoLayout>
          <AutoLayout
            name="Subject-list-group"
            fill="#C6EFC4"
            cornerRadius={6}
            overflow="visible"
            spacing={10}
            padding={{
              vertical: 2,
              horizontal: 4,
            }}
            verticalAlignItems="center"
          >
            {subjects.length > 0 ? (
              <AutoLayout
                name="subject-group"
                spacing={6}
                verticalAlignItems="center"
              >
                <Text
                  name="subjects:"
                  fill="#000"
                  fontFamily="Roboto Mono"
                  fontSize={10}
                >
                  subjects:
                </Text>
                {subjects.map((subject) => (
                  <Pill>{subject}</Pill>
                ))}
              </AutoLayout>
            ) : (
              <></>
            )}
          </AutoLayout>
        </AutoLayout>
        <AutoLayout
          name="Component-Content"
          stroke="#000"
          strokeWidth={0}
          overflow="visible"
          direction="vertical"
          spacing={6}
          padding={{
            top: 6,
            right: 0,
            bottom: 0,
            left: 4,
          }}
          strokeDashPattern={[2, 2]}
        >
          <AutoLayout
            name="Component-prop"
            spacing={6}
            verticalAlignItems="center"
          >
            <Text
              name="fill:"
              fill="#000"
              fontFamily="Roboto Mono"
              fontSize={12}
            >
              fill:
            </Text>
            <AutoLayout
              name="Frame 13"
              fill="#6FCF97"
              cornerRadius={6}
              overflow="visible"
              padding={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 2,
              }}
              verticalAlignItems="center"
            >
              <AutoLayout
                name="Close-icon-button"
                overflow="visible"
                spacing={10}
                padding={2}
              >
                <Frame
                  name="Variable"
                  strokeWidth={1.333}
                  width={16}
                  height={16}
                >
                  <SVG
                    name="Vector"
                    x={{
                      type: "horizontal-scale",
                      leftOffsetPercent: 16.967,
                      rightOffsetPercent: 16.967,
                    }}
                    y={{
                      type: "vertical-scale",
                      topOffsetPercent: 11.875,
                      bottomOffsetPercent: 11.833,
                    }}
                    height={12}
                    width={11}
                    src="<svg width='12' height='14' viewBox='0 0 12 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <path d='M3.87197 2.89865L5.99999 1.66983L6.97213 2.23118L6.33314 1.86254L5.9999 1.67028L5.6667 1.86262L3.87197 2.89865ZM6.33329 12.144L6.71221 11.9253L5.99999 12.3367L5.28668 11.9247L5.6667 12.144L5.99999 12.3364L6.33329 12.144ZM6.66666 7.00266C6.66666 7.37137 6.36824 7.66933 5.99999 7.66933C5.63175 7.66933 5.33333 7.37137 5.33333 7.00266C5.33333 6.63485 5.63218 6.33599 5.99999 6.33599C6.3678 6.33599 6.66666 6.63485 6.66666 7.00266Z' stroke='black' stroke-width='1.33333'/>
  </svg>
  "
                  />
                </Frame>
              </AutoLayout>
              <AutoLayout
                name="Frame 7"
                fill="#D3E6FF"
                cornerRadius={{
                  topLeft: 0,
                  topRight: 6,
                  bottomRight: 6,
                  bottomLeft: 0,
                }}
                overflow="visible"
                spacing={10}
                padding={4}
                verticalAlignItems="center"
              >
                <Text
                  name="color.button.primary.default"
                  fill="#1A1A1A"
                  fontFamily="Roboto Mono"
                  fontSize={12}
                >
                  color.button.primary.default
                </Text>
              </AutoLayout>
            </AutoLayout>
          </AutoLayout>
          <AutoLayout
            name="Component-prop"
            spacing={6}
            verticalAlignItems="center"
          >
            <Text
              name="leftMargin:"
              fill="#000"
              fontFamily="Roboto Mono"
              fontSize={12}
            >
              leftMargin:
            </Text>
            <AutoLayout
              name="Frame 13"
              fill="#6FCF97"
              cornerRadius={6}
              overflow="visible"
              padding={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 2,
              }}
              verticalAlignItems="center"
            >
              <AutoLayout
                name="Close-icon-button"
                overflow="visible"
                spacing={10}
                padding={2}
              >
                <Frame
                  name="Variable"
                  strokeWidth={1.333}
                  width={16}
                  height={16}
                >
                  <SVG
                    name="Vector"
                    x={{
                      type: "horizontal-scale",
                      leftOffsetPercent: 16.967,
                      rightOffsetPercent: 16.967,
                    }}
                    y={{
                      type: "vertical-scale",
                      topOffsetPercent: 11.875,
                      bottomOffsetPercent: 11.833,
                    }}
                    height={12}
                    width={11}
                    src="<svg width='12' height='14' viewBox='0 0 12 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <path d='M3.87197 2.89865L5.99999 1.66983L6.97213 2.23118L6.33314 1.86254L5.9999 1.67028L5.6667 1.86262L3.87197 2.89865ZM6.33329 12.144L6.71221 11.9253L5.99999 12.3367L5.28668 11.9247L5.6667 12.144L5.99999 12.3364L6.33329 12.144ZM6.66666 7.00266C6.66666 7.37137 6.36824 7.66933 5.99999 7.66933C5.63175 7.66933 5.33333 7.37137 5.33333 7.00266C5.33333 6.63485 5.63218 6.33599 5.99999 6.33599C6.3678 6.33599 6.66666 6.63485 6.66666 7.00266Z' stroke='black' stroke-width='1.33333'/>
  </svg>
  "
                  />
                </Frame>
              </AutoLayout>
              <AutoLayout
                name="Frame 7"
                fill="#D3E6FF"
                cornerRadius={{
                  topLeft: 0,
                  topRight: 6,
                  bottomRight: 6,
                  bottomLeft: 0,
                }}
                overflow="visible"
                spacing={10}
                padding={4}
                verticalAlignItems="center"
              >
                <Text
                  name="color.button.primary.default"
                  fill="#1A1A1A"
                  fontFamily="Roboto Mono"
                  fontSize={12}
                >
                  color.button.primary.default
                </Text>
              </AutoLayout>
            </AutoLayout>
          </AutoLayout>
          <AutoLayout name="Children-Component-Group" spacing={6}>
            <AutoLayout
              name="Child-Component-Frame"
              overflow="visible"
              direction="vertical"
              padding={{
                top: 6,
                right: 3,
                bottom: 6,
                left: 0,
              }}
            >
              <AutoLayout
                name="Component-Header"
                stroke={[
                  {
                    type: "solid",
                    color: {
                      r: 0.5208333134651184,
                      g: 0.5208333134651184,
                      b: 0.5208333134651184,
                      a: 1,
                    },
                  },
                  {
                    opacity: 0.2,
                    type: "solid",
                    color: {
                      r: 0,
                      g: 0,
                      b: 0,
                      a: 1,
                    },
                  },
                ]}
                strokeWidth={0}
                overflow="visible"
                spacing="auto"
                width="fill-parent"
                height={32}
                verticalAlignItems="center"
                strokeDashPattern={[2, 2]}
              >
                <AutoLayout
                  name="Title"
                  overflow="visible"
                  spacing={10}
                  verticalAlignItems="center"
                >
                  <Frame name="Component Icon" width={16} height={16}>
                    <SVG
                      name="Vector"
                      x={{
                        type: "horizontal-scale",
                        leftOffsetPercent: 0,
                        rightOffsetPercent: 0,
                      }}
                      y={{
                        type: "vertical-scale",
                        topOffsetPercent: 0,
                        bottomOffsetPercent: 0,
                      }}
                      height={16}
                      width={16}
                      src="<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <path fill-rule='evenodd' clip-rule='evenodd' d='M4.50044 3.50044L5.12889 4.12889L7.37156 6.37156L8 7L8.62844 6.37156L10.8711 4.12889L11.4996 3.50044L10.8711 2.87111L8.62844 0.628444L8 0L7.37156 0.628444L5.12889 2.87111L4.50044 3.50044ZM4.50044 12.4996L5.12889 13.1289L7.37156 15.3716L8 16L8.62844 15.3716L10.8711 13.1289L11.4996 12.5004L10.8711 11.8711L8.62844 9.62844L8 9L7.37156 9.62844L5.12889 11.8711L4.50044 12.4996ZM0.628444 8.62844L0 8L0.628444 7.37156L2.87111 5.12889L3.50044 4.50044L4.12889 5.12889L6.37156 7.37156L7 8L6.37156 8.62844L4.12889 10.8711L3.50044 11.4996L2.87111 10.8711L0.628444 8.62844ZM9 8L9.62844 8.62844L11.8711 10.8711L12.4996 11.4996L13.1289 10.8711L15.3716 8.62844L16 8L15.3716 7.37156L13.1289 5.12889L12.5004 4.50044L11.8711 5.12889L9.62844 7.37156L9 8Z' fill='#1A1A1A'/>
  </svg>
  "
                    />
                  </Frame>
                  <Text
                    name="Component-title"
                    fill="#030303"
                    fontSize={14}
                    fontWeight={700}
                  >
                    Button Label
                  </Text>
                  <AutoLayout
                    name="Close-icon-button"
                    overflow="visible"
                    spacing={10}
                    padding={2}
                  >
                    <Close24Px name="close_24px" />
                  </AutoLayout>
                </AutoLayout>
                <AutoLayout
                  name="Subject-list-group"
                  fill="#C6EFC4"
                  cornerRadius={6}
                  overflow="visible"
                  spacing={10}
                  padding={{
                    vertical: 2,
                    horizontal: 4,
                  }}
                  verticalAlignItems="center"
                >
                  <AutoLayout
                    name="subject-group"
                    spacing={6}
                    verticalAlignItems="center"
                  >
                    <Text
                      name="subjects:"
                      fill="#000"
                      fontFamily="Roboto Mono"
                      fontSize={10}
                    >
                      subjects:
                    </Text>
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
                        name="actions"
                        fill="#1A1A1A"
                        fontFamily="Roboto Mono"
                        fontSize={10}
                      >
                        actions
                      </Text>
                    </AutoLayout>
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
                        name="actions"
                        fill="#1A1A1A"
                        fontFamily="Roboto Mono"
                        fontSize={10}
                      >
                        actions
                      </Text>
                    </AutoLayout>
                  </AutoLayout>
                </AutoLayout>
              </AutoLayout>
              <AutoLayout
                name="Component-Content"
                stroke="#000"
                strokeWidth={0}
                overflow="visible"
                direction="vertical"
                spacing={6}
                padding={{
                  top: 6,
                  right: 0,
                  bottom: 0,
                  left: 4,
                }}
                strokeDashPattern={[2, 2]}
              >
                <AutoLayout
                  name="Component-prop"
                  spacing={6}
                  verticalAlignItems="center"
                >
                  <Text
                    name="fill:"
                    fill="#000"
                    fontFamily="Roboto Mono"
                    fontSize={12}
                  >
                    fill:
                  </Text>
                  <AutoLayout
                    name="Frame 8"
                    fill="#F2C94C"
                    cornerRadius={6}
                    overflow="visible"
                    padding={{
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 2,
                    }}
                    verticalAlignItems="center"
                  >
                    <AutoLayout
                      name="Close-icon-button"
                      overflow="visible"
                      spacing={10}
                      padding={2}
                    >
                      <Frame
                        name="Variable"
                        strokeWidth={1.333}
                        width={16}
                        height={16}
                      >
                        <SVG
                          name="Vector"
                          x={{
                            type: "horizontal-scale",
                            leftOffsetPercent: 16.967,
                            rightOffsetPercent: 16.967,
                          }}
                          y={{
                            type: "vertical-scale",
                            topOffsetPercent: 11.875,
                            bottomOffsetPercent: 11.833,
                          }}
                          height={12}
                          width={11}
                          src="<svg width='12' height='14' viewBox='0 0 12 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <path d='M3.87197 2.89865L5.99999 1.66983L6.97213 2.23118L6.33314 1.86254L5.9999 1.67028L5.6667 1.86262L3.87197 2.89865ZM6.33329 12.144L6.71221 11.9253L5.99999 12.3367L5.28668 11.9247L5.6667 12.144L5.99999 12.3364L6.33329 12.144ZM6.66666 7.00266C6.66666 7.37137 6.36824 7.66933 5.99999 7.66933C5.63175 7.66933 5.33333 7.37137 5.33333 7.00266C5.33333 6.63485 5.63218 6.33599 5.99999 6.33599C6.3678 6.33599 6.66666 6.63485 6.66666 7.00266Z' stroke='black' stroke-width='1.33333'/>
  </svg>
  "
                        />
                      </Frame>
                    </AutoLayout>
                    <AutoLayout
                      name="Frame 7"
                      fill="#D3E6FF"
                      cornerRadius={{
                        topLeft: 0,
                        topRight: 6,
                        bottomRight: 6,
                        bottomLeft: 0,
                      }}
                      overflow="visible"
                      spacing={10}
                      padding={4}
                      verticalAlignItems="center"
                    >
                      <Text
                        name="colour.button.primary.default"
                        fill="#F00"
                        fontFamily="Roboto Mono"
                        fontSize={12}
                        fontWeight={700}
                      >
                        colour .button.primary.default
                      </Text>
                    </AutoLayout>
                  </AutoLayout>
                </AutoLayout>
                <AutoLayout
                  name="Component-prop"
                  spacing={6}
                  verticalAlignItems="center"
                >
                  <Text
                    name="leftMargin:"
                    fill="#000"
                    fontFamily="Roboto Mono"
                    fontSize={12}
                  >
                    leftMargin:
                  </Text>
                  <AutoLayout
                    name="Frame 8"
                    fill="#F2C94C"
                    cornerRadius={6}
                    overflow="visible"
                    padding={{
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 2,
                    }}
                    verticalAlignItems="center"
                  >
                    <AutoLayout
                      name="Close-icon-button"
                      overflow="visible"
                      spacing={10}
                      padding={2}
                    >
                      <Frame
                        name="Variable"
                        strokeWidth={1.333}
                        width={16}
                        height={16}
                      >
                        <SVG
                          name="Vector"
                          x={{
                            type: "horizontal-scale",
                            leftOffsetPercent: 16.967,
                            rightOffsetPercent: 16.967,
                          }}
                          y={{
                            type: "vertical-scale",
                            topOffsetPercent: 11.875,
                            bottomOffsetPercent: 11.833,
                          }}
                          height={12}
                          width={11}
                          src="<svg width='12' height='14' viewBox='0 0 12 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <path d='M3.87197 2.89868L5.99999 1.66986L6.97213 2.23121L6.33314 1.86257L5.9999 1.67031L5.6667 1.86265L3.87197 2.89868ZM6.33329 12.1441L6.71221 11.9253L5.99999 12.3368L5.28668 11.9247L5.6667 12.1441L5.99999 12.3365L6.33329 12.1441ZM6.66666 7.00269C6.66666 7.3714 6.36824 7.66936 5.99999 7.66936C5.63175 7.66936 5.33333 7.3714 5.33333 7.00269C5.33333 6.63488 5.63218 6.33602 5.99999 6.33602C6.3678 6.33602 6.66666 6.63488 6.66666 7.00269Z' stroke='black' stroke-width='1.33333'/>
  </svg>
  "
                        />
                      </Frame>
                    </AutoLayout>
                    <AutoLayout
                      name="Frame 7"
                      fill="#D3E6FF"
                      cornerRadius={{
                        topLeft: 0,
                        topRight: 6,
                        bottomRight: 6,
                        bottomLeft: 0,
                      }}
                      overflow="visible"
                      spacing={10}
                      padding={4}
                      verticalAlignItems="center"
                    >
                      <Text
                        name="colour.button.primary.default"
                        fill="#F00"
                        fontFamily="Roboto Mono"
                        fontSize={12}
                        fontWeight={700}
                      >
                        colour .button.primary.default
                      </Text>
                    </AutoLayout>
                  </AutoLayout>
                </AutoLayout>
                <AutoLayout name="Children-Component-Group" spacing={6}>
                  <AutoLayout
                    name="Child-Component-Frame"
                    overflow="visible"
                    direction="vertical"
                    padding={{
                      top: 6,
                      right: 3,
                      bottom: 6,
                      left: 0,
                    }}
                  >
                    <AutoLayout
                      name="Component-Header"
                      stroke={[
                        {
                          type: "solid",
                          color: {
                            r: 0.5208333134651184,
                            g: 0.5208333134651184,
                            b: 0.5208333134651184,
                            a: 1,
                          },
                        },
                        {
                          opacity: 0.2,
                          type: "solid",
                          color: {
                            r: 0,
                            g: 0,
                            b: 0,
                            a: 1,
                          },
                        },
                      ]}
                      strokeWidth={0}
                      overflow="visible"
                      spacing="auto"
                      width="fill-parent"
                      height={32}
                      verticalAlignItems="center"
                      strokeDashPattern={[2, 2]}
                    >
                      <AutoLayout
                        name="Title"
                        overflow="visible"
                        spacing={10}
                        verticalAlignItems="center"
                      >
                        <Frame name="Component Icon" width={16} height={16}>
                          <SVG
                            name="Vector"
                            x={{
                              type: "horizontal-scale",
                              leftOffsetPercent: 0,
                              rightOffsetPercent: 0,
                            }}
                            y={{
                              type: "vertical-scale",
                              topOffsetPercent: 0,
                              bottomOffsetPercent: 0,
                            }}
                            height={16}
                            width={16}
                            src="<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <path fill-rule='evenodd' clip-rule='evenodd' d='M4.50044 3.50044L5.12889 4.12889L7.37156 6.37156L8 7L8.62844 6.37156L10.8711 4.12889L11.4996 3.50044L10.8711 2.87111L8.62844 0.628444L8 0L7.37156 0.628444L5.12889 2.87111L4.50044 3.50044ZM4.50044 12.4996L5.12889 13.1289L7.37156 15.3716L8 16L8.62844 15.3716L10.8711 13.1289L11.4996 12.5004L10.8711 11.8711L8.62844 9.62844L8 9L7.37156 9.62844L5.12889 11.8711L4.50044 12.4996ZM0.628444 8.62844L0 8L0.628444 7.37156L2.87111 5.12889L3.50044 4.50044L4.12889 5.12889L6.37156 7.37156L7 8L6.37156 8.62844L4.12889 10.8711L3.50044 11.4996L2.87111 10.8711L0.628444 8.62844ZM9 8L9.62844 8.62844L11.8711 10.8711L12.4996 11.4996L13.1289 10.8711L15.3716 8.62844L16 8L15.3716 7.37156L13.1289 5.12889L12.5004 4.50044L11.8711 5.12889L9.62844 7.37156L9 8Z' fill='#1A1A1A'/>
  </svg>
  "
                          />
                        </Frame>
                        <Text
                          name="Component-title"
                          fill="#030303"
                          fontSize={14}
                          fontWeight={700}
                        >
                          Button Label
                        </Text>
                        <AutoLayout
                          name="Close-icon-button"
                          overflow="visible"
                          spacing={10}
                          padding={2}
                        >
                          <Close24Px name="close_24px" />
                        </AutoLayout>
                      </AutoLayout>
                      <AutoLayout
                        name="Subject-list-group"
                        fill="#C6EFC4"
                        cornerRadius={6}
                        overflow="visible"
                        spacing={10}
                        padding={{
                          vertical: 2,
                          horizontal: 4,
                        }}
                        verticalAlignItems="center"
                      >
                        <AutoLayout
                          name="subject-group"
                          spacing={6}
                          verticalAlignItems="center"
                        >
                          <Text
                            name="subjects:"
                            fill="#000"
                            fontFamily="Roboto Mono"
                            fontSize={10}
                          >
                            subjects:
                          </Text>
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
                              name="actions"
                              fill="#1A1A1A"
                              fontFamily="Roboto Mono"
                              fontSize={10}
                            >
                              actions
                            </Text>
                          </AutoLayout>
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
                              name="actions"
                              fill="#1A1A1A"
                              fontFamily="Roboto Mono"
                              fontSize={10}
                            >
                              actions
                            </Text>
                          </AutoLayout>
                        </AutoLayout>
                      </AutoLayout>
                    </AutoLayout>
                    <AutoLayout
                      name="Component-Content"
                      stroke="#000"
                      strokeWidth={0}
                      overflow="visible"
                      direction="vertical"
                      spacing={6}
                      padding={{
                        top: 6,
                        right: 0,
                        bottom: 0,
                        left: 4,
                      }}
                      strokeDashPattern={[2, 2]}
                    >
                      <AutoLayout
                        name="Component-prop"
                        spacing={6}
                        verticalAlignItems="center"
                      >
                        <Text
                          name="fill:"
                          fill="#000"
                          fontFamily="Roboto Mono"
                          fontSize={12}
                        >
                          fill:
                        </Text>
                        <AutoLayout
                          name="Frame 13"
                          fill="#6FCF97"
                          cornerRadius={6}
                          overflow="visible"
                          padding={{
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 2,
                          }}
                          verticalAlignItems="center"
                        >
                          <AutoLayout
                            name="Close-icon-button"
                            overflow="visible"
                            spacing={10}
                            padding={2}
                          >
                            <Frame
                              name="Variable"
                              strokeWidth={1.333}
                              width={16}
                              height={16}
                            >
                              <SVG
                                name="Vector"
                                x={{
                                  type: "horizontal-scale",
                                  leftOffsetPercent: 16.967,
                                  rightOffsetPercent: 16.967,
                                }}
                                y={{
                                  type: "vertical-scale",
                                  topOffsetPercent: 11.875,
                                  bottomOffsetPercent: 11.833,
                                }}
                                height={12}
                                width={11}
                                src="<svg width='12' height='14' viewBox='0 0 12 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <path d='M3.87197 2.89868L5.99999 1.66986L6.97213 2.23121L6.33314 1.86257L5.9999 1.67031L5.6667 1.86265L3.87197 2.89868ZM6.33329 12.1441L6.71221 11.9253L5.99999 12.3368L5.28668 11.9247L5.6667 12.1441L5.99999 12.3365L6.33329 12.1441ZM6.66666 7.00269C6.66666 7.3714 6.36824 7.66936 5.99999 7.66936C5.63175 7.66936 5.33333 7.3714 5.33333 7.00269C5.33333 6.63488 5.63218 6.33602 5.99999 6.33602C6.3678 6.33602 6.66666 6.63488 6.66666 7.00269Z' stroke='black' stroke-width='1.33333'/>
  </svg>
  "
                              />
                            </Frame>
                          </AutoLayout>
                          <AutoLayout
                            name="Frame 7"
                            fill="#D3E6FF"
                            cornerRadius={{
                              topLeft: 0,
                              topRight: 6,
                              bottomRight: 6,
                              bottomLeft: 0,
                            }}
                            overflow="visible"
                            spacing={10}
                            padding={4}
                            verticalAlignItems="center"
                          >
                            <Text
                              name="color.button.primary.default"
                              fill="#1A1A1A"
                              fontFamily="Roboto Mono"
                              fontSize={12}
                            >
                              color.button.primary.default
                            </Text>
                          </AutoLayout>
                        </AutoLayout>
                      </AutoLayout>
                      <AutoLayout
                        name="Component-prop"
                        spacing={6}
                        verticalAlignItems="center"
                      >
                        <Text
                          name="leftMargin:"
                          fill="#000"
                          fontFamily="Roboto Mono"
                          fontSize={12}
                        >
                          leftMargin:
                        </Text>
                        <AutoLayout
                          name="Frame 13"
                          fill="#6FCF97"
                          cornerRadius={6}
                          overflow="visible"
                          padding={{
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 2,
                          }}
                          verticalAlignItems="center"
                        >
                          <AutoLayout
                            name="Close-icon-button"
                            overflow="visible"
                            spacing={10}
                            padding={2}
                          >
                            <Frame
                              name="Variable"
                              strokeWidth={1.333}
                              width={16}
                              height={16}
                            >
                              <SVG
                                name="Vector"
                                x={{
                                  type: "horizontal-scale",
                                  leftOffsetPercent: 16.967,
                                  rightOffsetPercent: 16.967,
                                }}
                                y={{
                                  type: "vertical-scale",
                                  topOffsetPercent: 11.875,
                                  bottomOffsetPercent: 11.833,
                                }}
                                height={12}
                                width={11}
                                src="<svg width='12' height='14' viewBox='0 0 12 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <path d='M3.87197 2.89868L5.99999 1.66986L6.97213 2.23121L6.33314 1.86257L5.9999 1.67031L5.6667 1.86265L3.87197 2.89868ZM6.33329 12.1441L6.71221 11.9253L5.99999 12.3368L5.28668 11.9247L5.6667 12.1441L5.99999 12.3365L6.33329 12.1441ZM6.66666 7.00269C6.66666 7.3714 6.36824 7.66936 5.99999 7.66936C5.63175 7.66936 5.33333 7.3714 5.33333 7.00269C5.33333 6.63488 5.63218 6.33602 5.99999 6.33602C6.3678 6.33602 6.66666 6.63488 6.66666 7.00269Z' stroke='black' stroke-width='1.33333'/>
  </svg>
  "
                              />
                            </Frame>
                          </AutoLayout>
                          <AutoLayout
                            name="Frame 7"
                            fill="#D3E6FF"
                            cornerRadius={{
                              topLeft: 0,
                              topRight: 6,
                              bottomRight: 6,
                              bottomLeft: 0,
                            }}
                            overflow="visible"
                            spacing={10}
                            padding={4}
                            verticalAlignItems="center"
                          >
                            <Text
                              name="color.button.primary.default"
                              fill="#1A1A1A"
                              fontFamily="Roboto Mono"
                              fontSize={12}
                            >
                              color.button.primary.default
                            </Text>
                          </AutoLayout>
                        </AutoLayout>
                      </AutoLayout>
                    </AutoLayout>
                  </AutoLayout>
                  <AutoLayout
                    name="Child-Component-Frame"
                    overflow="visible"
                    direction="vertical"
                    padding={{
                      top: 6,
                      right: 3,
                      bottom: 6,
                      left: 0,
                    }}
                  >
                    <AutoLayout
                      name="Component-Header"
                      stroke={[
                        {
                          type: "solid",
                          color: {
                            r: 0.5208333134651184,
                            g: 0.5208333134651184,
                            b: 0.5208333134651184,
                            a: 1,
                          },
                        },
                        {
                          opacity: 0.2,
                          type: "solid",
                          color: {
                            r: 0,
                            g: 0,
                            b: 0,
                            a: 1,
                          },
                        },
                      ]}
                      strokeWidth={0}
                      overflow="visible"
                      spacing="auto"
                      width="fill-parent"
                      height={32}
                      verticalAlignItems="center"
                      strokeDashPattern={[2, 2]}
                    >
                      <AutoLayout
                        name="Title"
                        overflow="visible"
                        spacing={10}
                        verticalAlignItems="center"
                      >
                        <Frame name="Component Icon" width={16} height={16}>
                          <SVG
                            name="Vector"
                            x={{
                              type: "horizontal-scale",
                              leftOffsetPercent: 0,
                              rightOffsetPercent: 0,
                            }}
                            y={{
                              type: "vertical-scale",
                              topOffsetPercent: 0,
                              bottomOffsetPercent: 0,
                            }}
                            height={16}
                            width={16}
                            src="<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <path fill-rule='evenodd' clip-rule='evenodd' d='M4.50044 3.50044L5.12889 4.12889L7.37156 6.37156L8 7L8.62844 6.37156L10.8711 4.12889L11.4996 3.50044L10.8711 2.87111L8.62844 0.628444L8 0L7.37156 0.628444L5.12889 2.87111L4.50044 3.50044ZM4.50044 12.4996L5.12889 13.1289L7.37156 15.3716L8 16L8.62844 15.3716L10.8711 13.1289L11.4996 12.5004L10.8711 11.8711L8.62844 9.62844L8 9L7.37156 9.62844L5.12889 11.8711L4.50044 12.4996ZM0.628444 8.62844L0 8L0.628444 7.37156L2.87111 5.12889L3.50044 4.50044L4.12889 5.12889L6.37156 7.37156L7 8L6.37156 8.62844L4.12889 10.8711L3.50044 11.4996L2.87111 10.8711L0.628444 8.62844ZM9 8L9.62844 8.62844L11.8711 10.8711L12.4996 11.4996L13.1289 10.8711L15.3716 8.62844L16 8L15.3716 7.37156L13.1289 5.12889L12.5004 4.50044L11.8711 5.12889L9.62844 7.37156L9 8Z' fill='#1A1A1A'/>
  </svg>
  "
                          />
                        </Frame>
                        <Text
                          name="Component-title"
                          fill="#030303"
                          fontSize={14}
                          fontWeight={700}
                        >
                          Button Label
                        </Text>
                        <AutoLayout
                          name="Close-icon-button"
                          overflow="visible"
                          spacing={10}
                          padding={2}
                        >
                          <Close24Px name="close_24px" />
                        </AutoLayout>
                      </AutoLayout>
                      <AutoLayout
                        name="Subject-list-group"
                        fill="#C6EFC4"
                        cornerRadius={6}
                        overflow="visible"
                        spacing={10}
                        padding={{
                          vertical: 2,
                          horizontal: 4,
                        }}
                        verticalAlignItems="center"
                      >
                        <AutoLayout
                          name="subject-group"
                          spacing={6}
                          verticalAlignItems="center"
                        >
                          <Text
                            name="subjects:"
                            fill="#000"
                            fontFamily="Roboto Mono"
                            fontSize={10}
                          >
                            subjects:
                          </Text>
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
                              name="actions"
                              fill="#1A1A1A"
                              fontFamily="Roboto Mono"
                              fontSize={10}
                            >
                              actions
                            </Text>
                          </AutoLayout>
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
                              name="actions"
                              fill="#1A1A1A"
                              fontFamily="Roboto Mono"
                              fontSize={10}
                            >
                              actions
                            </Text>
                          </AutoLayout>
                        </AutoLayout>
                      </AutoLayout>
                    </AutoLayout>
                    <AutoLayout
                      name="Component-Content"
                      stroke="#000"
                      strokeWidth={0}
                      overflow="visible"
                      direction="vertical"
                      spacing={6}
                      padding={{
                        top: 6,
                        right: 0,
                        bottom: 0,
                        left: 4,
                      }}
                      strokeDashPattern={[2, 2]}
                    >
                      <AutoLayout
                        name="Component-prop"
                        spacing={6}
                        verticalAlignItems="center"
                      >
                        <Text
                          name="fill:"
                          fill="#000"
                          fontFamily="Roboto Mono"
                          fontSize={12}
                        >
                          fill:
                        </Text>
                        <AutoLayout
                          name="Frame 13"
                          fill="#6FCF97"
                          cornerRadius={6}
                          overflow="visible"
                          padding={{
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 2,
                          }}
                          verticalAlignItems="center"
                        >
                          <AutoLayout
                            name="Close-icon-button"
                            overflow="visible"
                            spacing={10}
                            padding={2}
                          >
                            <Frame
                              name="Variable"
                              strokeWidth={1.333}
                              width={16}
                              height={16}
                            >
                              <SVG
                                name="Vector"
                                x={{
                                  type: "horizontal-scale",
                                  leftOffsetPercent: 16.967,
                                  rightOffsetPercent: 16.967,
                                }}
                                y={{
                                  type: "vertical-scale",
                                  topOffsetPercent: 11.875,
                                  bottomOffsetPercent: 11.833,
                                }}
                                height={12}
                                width={11}
                                src="<svg width='12' height='14' viewBox='0 0 12 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <path d='M3.87197 2.89868L5.99999 1.66986L6.97213 2.23121L6.33314 1.86257L5.9999 1.67031L5.6667 1.86265L3.87197 2.89868ZM6.33329 12.1441L6.71221 11.9253L5.99999 12.3368L5.28668 11.9247L5.6667 12.1441L5.99999 12.3365L6.33329 12.1441ZM6.66666 7.00269C6.66666 7.3714 6.36824 7.66936 5.99999 7.66936C5.63175 7.66936 5.33333 7.3714 5.33333 7.00269C5.33333 6.63488 5.63218 6.33602 5.99999 6.33602C6.3678 6.33602 6.66666 6.63488 6.66666 7.00269Z' stroke='black' stroke-width='1.33333'/>
  </svg>
  "
                              />
                            </Frame>
                          </AutoLayout>
                          <AutoLayout
                            name="Frame 7"
                            fill="#D3E6FF"
                            cornerRadius={{
                              topLeft: 0,
                              topRight: 6,
                              bottomRight: 6,
                              bottomLeft: 0,
                            }}
                            overflow="visible"
                            spacing={10}
                            padding={4}
                            verticalAlignItems="center"
                          >
                            <Text
                              name="color.button.primary.default"
                              fill="#1A1A1A"
                              fontFamily="Roboto Mono"
                              fontSize={12}
                            >
                              color.button.primary.default
                            </Text>
                          </AutoLayout>
                        </AutoLayout>
                      </AutoLayout>
                      <AutoLayout
                        name="Component-prop"
                        spacing={6}
                        verticalAlignItems="center"
                      >
                        <Text
                          name="leftMargin:"
                          fill="#000"
                          fontFamily="Roboto Mono"
                          fontSize={12}
                        >
                          leftMargin:
                        </Text>
                        <AutoLayout
                          name="Frame 13"
                          fill="#6FCF97"
                          cornerRadius={6}
                          overflow="visible"
                          padding={{
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 2,
                          }}
                          verticalAlignItems="center"
                        >
                          <AutoLayout
                            name="Close-icon-button"
                            overflow="visible"
                            spacing={10}
                            padding={2}
                          >
                            <Frame
                              name="Variable"
                              strokeWidth={1.333}
                              width={16}
                              height={16}
                            >
                              <SVG
                                name="Vector"
                                x={{
                                  type: "horizontal-scale",
                                  leftOffsetPercent: 16.967,
                                  rightOffsetPercent: 16.967,
                                }}
                                y={{
                                  type: "vertical-scale",
                                  topOffsetPercent: 11.875,
                                  bottomOffsetPercent: 11.833,
                                }}
                                height={12}
                                width={11}
                                src="<svg width='12' height='14' viewBox='0 0 12 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <path d='M3.87197 2.89868L5.99999 1.66986L6.97213 2.23121L6.33314 1.86257L5.9999 1.67031L5.6667 1.86265L3.87197 2.89868ZM6.33329 12.1441L6.71221 11.9253L5.99999 12.3368L5.28668 11.9247L5.6667 12.1441L5.99999 12.3365L6.33329 12.1441ZM6.66666 7.00269C6.66666 7.3714 6.36824 7.66936 5.99999 7.66936C5.63175 7.66936 5.33333 7.3714 5.33333 7.00269C5.33333 6.63488 5.63218 6.33602 5.99999 6.33602C6.3678 6.33602 6.66666 6.63488 6.66666 7.00269Z' stroke='black' stroke-width='1.33333'/>
  </svg>
  "
                              />
                            </Frame>
                          </AutoLayout>
                          <AutoLayout
                            name="Frame 7"
                            fill="#D3E6FF"
                            cornerRadius={{
                              topLeft: 0,
                              topRight: 6,
                              bottomRight: 6,
                              bottomLeft: 0,
                            }}
                            overflow="visible"
                            spacing={10}
                            padding={4}
                            verticalAlignItems="center"
                          >
                            <Text
                              name="color.button.primary.default"
                              fill="#1A1A1A"
                              fontFamily="Roboto Mono"
                              fontSize={12}
                            >
                              color.button.primary.default
                            </Text>
                          </AutoLayout>
                        </AutoLayout>
                      </AutoLayout>
                    </AutoLayout>
                  </AutoLayout>
                </AutoLayout>
              </AutoLayout>
            </AutoLayout>
            <AutoLayout
              name="Child-Component-Frame"
              overflow="visible"
              direction="vertical"
              padding={{
                top: 6,
                right: 3,
                bottom: 6,
                left: 0,
              }}
            >
              <AutoLayout
                name="Component-Header"
                stroke={[
                  {
                    type: "solid",
                    color: {
                      r: 0.5208333134651184,
                      g: 0.5208333134651184,
                      b: 0.5208333134651184,
                      a: 1,
                    },
                  },
                  {
                    opacity: 0.2,
                    type: "solid",
                    color: {
                      r: 0,
                      g: 0,
                      b: 0,
                      a: 1,
                    },
                  },
                ]}
                strokeWidth={0}
                overflow="visible"
                spacing="auto"
                width="fill-parent"
                height={32}
                verticalAlignItems="center"
                strokeDashPattern={[2, 2]}
              >
                <AutoLayout
                  name="Title"
                  overflow="visible"
                  spacing={10}
                  verticalAlignItems="center"
                >
                  <Frame name="Component Icon" width={16} height={16}>
                    <SVG
                      name="Vector"
                      x={{
                        type: "horizontal-scale",
                        leftOffsetPercent: 0,
                        rightOffsetPercent: 0,
                      }}
                      y={{
                        type: "vertical-scale",
                        topOffsetPercent: 0,
                        bottomOffsetPercent: 0,
                      }}
                      height={16}
                      width={16}
                      src="<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <path fill-rule='evenodd' clip-rule='evenodd' d='M16 8L8 0L0 8L8 16L16 8Z' fill='#1A1A1A'/>
  </svg>
  "
                    />
                  </Frame>
                  <Text
                    name="Component-title"
                    fill="#030303"
                    fontSize={14}
                    fontWeight={700}
                  >
                    Button Label
                  </Text>
                  <AutoLayout
                    name="Close-icon-button"
                    overflow="visible"
                    spacing={10}
                    padding={2}
                  >
                    <Close24Px name="close_24px" />
                  </AutoLayout>
                </AutoLayout>
                <AutoLayout
                  name="Subject-list-group"
                  fill="#C6EFC4"
                  cornerRadius={6}
                  overflow="visible"
                  spacing={10}
                  padding={{
                    vertical: 2,
                    horizontal: 4,
                  }}
                  verticalAlignItems="center"
                >
                  <AutoLayout
                    name="subject-group"
                    spacing={6}
                    verticalAlignItems="center"
                  >
                    <Text
                      name="subjects:"
                      fill="#000"
                      fontFamily="Roboto Mono"
                      fontSize={10}
                    >
                      subjects:
                    </Text>
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
                        name="actions"
                        fill="#1A1A1A"
                        fontFamily="Roboto Mono"
                        fontSize={10}
                      >
                        actions
                      </Text>
                    </AutoLayout>
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
                        name="actions"
                        fill="#1A1A1A"
                        fontFamily="Roboto Mono"
                        fontSize={10}
                      >
                        actions
                      </Text>
                    </AutoLayout>
                  </AutoLayout>
                </AutoLayout>
              </AutoLayout>
              <AutoLayout
                name="Component-Content"
                stroke="#000"
                strokeWidth={0}
                overflow="visible"
                direction="vertical"
                spacing={6}
                padding={{
                  top: 6,
                  right: 0,
                  bottom: 0,
                  left: 4,
                }}
                strokeDashPattern={[2, 2]}
              >
                <AutoLayout
                  name="Component-prop"
                  spacing={6}
                  verticalAlignItems="center"
                >
                  <Text
                    name="fill:"
                    fill="#000"
                    fontFamily="Roboto Mono"
                    fontSize={12}
                  >
                    fill:
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
                      color.button.primary.default
                    </Text>
                  </AutoLayout>
                </AutoLayout>
                <AutoLayout
                  name="Component-prop"
                  spacing={6}
                  verticalAlignItems="center"
                >
                  <Text
                    name="leftMargin:"
                    fill="#000"
                    fontFamily="Roboto Mono"
                    fontSize={12}
                  >
                    leftMargin:
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
                      color.button.primary.default
                    </Text>
                  </AutoLayout>
                </AutoLayout>
                <AutoLayout name="Children-Component-Group" spacing={6}>
                  <AutoLayout
                    name="Child-Component-Frame"
                    overflow="visible"
                    direction="vertical"
                    padding={{
                      top: 6,
                      right: 3,
                      bottom: 6,
                      left: 0,
                    }}
                  >
                    <AutoLayout
                      name="Component-Header"
                      stroke={[
                        {
                          type: "solid",
                          color: {
                            r: 0.5208333134651184,
                            g: 0.5208333134651184,
                            b: 0.5208333134651184,
                            a: 1,
                          },
                        },
                        {
                          opacity: 0.2,
                          type: "solid",
                          color: {
                            r: 0,
                            g: 0,
                            b: 0,
                            a: 1,
                          },
                        },
                      ]}
                      strokeWidth={0}
                      overflow="visible"
                      spacing="auto"
                      width="fill-parent"
                      height={32}
                      verticalAlignItems="center"
                      strokeDashPattern={[2, 2]}
                    >
                      <AutoLayout
                        name="Title"
                        overflow="visible"
                        spacing={10}
                        verticalAlignItems="center"
                      >
                        <Frame name="Component Icon" width={16} height={16}>
                          <SVG
                            name="Vector"
                            x={{
                              type: "horizontal-scale",
                              leftOffsetPercent: 0,
                              rightOffsetPercent: 0,
                            }}
                            y={{
                              type: "vertical-scale",
                              topOffsetPercent: 0,
                              bottomOffsetPercent: 0,
                            }}
                            height={16}
                            width={16}
                            src="<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <path fill-rule='evenodd' clip-rule='evenodd' d='M4.50044 3.50044L5.12889 4.12889L7.37156 6.37156L8 7L8.62844 6.37156L10.8711 4.12889L11.4996 3.50044L10.8711 2.87111L8.62844 0.628444L8 0L7.37156 0.628444L5.12889 2.87111L4.50044 3.50044ZM4.50044 12.4996L5.12889 13.1289L7.37156 15.3716L8 16L8.62844 15.3716L10.8711 13.1289L11.4996 12.5004L10.8711 11.8711L8.62844 9.62844L8 9L7.37156 9.62844L5.12889 11.8711L4.50044 12.4996ZM0.628444 8.62844L0 8L0.628444 7.37156L2.87111 5.12889L3.50044 4.50044L4.12889 5.12889L6.37156 7.37156L7 8L6.37156 8.62844L4.12889 10.8711L3.50044 11.4996L2.87111 10.8711L0.628444 8.62844ZM9 8L9.62844 8.62844L11.8711 10.8711L12.4996 11.4996L13.1289 10.8711L15.3716 8.62844L16 8L15.3716 7.37156L13.1289 5.12889L12.5004 4.50044L11.8711 5.12889L9.62844 7.37156L9 8Z' fill='#1A1A1A'/>
  </svg>
  "
                          />
                        </Frame>
                        <Text
                          name="Component-title"
                          fill="#030303"
                          fontSize={14}
                          fontWeight={700}
                        >
                          Button Label
                        </Text>
                        <AutoLayout
                          name="Close-icon-button"
                          overflow="visible"
                          spacing={10}
                          padding={2}
                        >
                          <Close24Px name="close_24px" />
                        </AutoLayout>
                      </AutoLayout>
                      <AutoLayout
                        name="Subject-list-group"
                        fill="#C6EFC4"
                        cornerRadius={6}
                        overflow="visible"
                        spacing={10}
                        padding={{
                          vertical: 2,
                          horizontal: 4,
                        }}
                        verticalAlignItems="center"
                      >
                        <AutoLayout
                          name="subject-group"
                          spacing={6}
                          verticalAlignItems="center"
                        >
                          <Text
                            name="subjects:"
                            fill="#000"
                            fontFamily="Roboto Mono"
                            fontSize={10}
                          >
                            subjects:
                          </Text>
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
                              name="actions"
                              fill="#1A1A1A"
                              fontFamily="Roboto Mono"
                              fontSize={10}
                            >
                              actions
                            </Text>
                          </AutoLayout>
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
                              name="actions"
                              fill="#1A1A1A"
                              fontFamily="Roboto Mono"
                              fontSize={10}
                            >
                              actions
                            </Text>
                          </AutoLayout>
                        </AutoLayout>
                      </AutoLayout>
                    </AutoLayout>
                    <AutoLayout
                      name="Component-Content"
                      stroke="#000"
                      strokeWidth={0}
                      overflow="visible"
                      direction="vertical"
                      spacing={6}
                      padding={{
                        top: 6,
                        right: 0,
                        bottom: 0,
                        left: 4,
                      }}
                      strokeDashPattern={[2, 2]}
                    >
                      <AutoLayout
                        name="Component-prop"
                        spacing={6}
                        verticalAlignItems="center"
                      >
                        <Text
                          name="fill:"
                          fill="#000"
                          fontFamily="Roboto Mono"
                          fontSize={12}
                        >
                          fill:
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
                            color.button.primary.default
                          </Text>
                        </AutoLayout>
                      </AutoLayout>
                      <AutoLayout
                        name="Component-prop"
                        spacing={6}
                        verticalAlignItems="center"
                      >
                        <Text
                          name="leftMargin:"
                          fill="#000"
                          fontFamily="Roboto Mono"
                          fontSize={12}
                        >
                          leftMargin:
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
                            color.button.primary.default
                          </Text>
                        </AutoLayout>
                      </AutoLayout>
                    </AutoLayout>
                  </AutoLayout>
                  <AutoLayout
                    name="Child-Component-Frame"
                    overflow="visible"
                    direction="vertical"
                    padding={{
                      top: 6,
                      right: 3,
                      bottom: 6,
                      left: 0,
                    }}
                  >
                    <AutoLayout
                      name="Component-Header"
                      stroke={[
                        {
                          type: "solid",
                          color: {
                            r: 0.5208333134651184,
                            g: 0.5208333134651184,
                            b: 0.5208333134651184,
                            a: 1,
                          },
                        },
                        {
                          opacity: 0.2,
                          type: "solid",
                          color: {
                            r: 0,
                            g: 0,
                            b: 0,
                            a: 1,
                          },
                        },
                      ]}
                      strokeWidth={0}
                      overflow="visible"
                      spacing="auto"
                      width="fill-parent"
                      height={32}
                      verticalAlignItems="center"
                      strokeDashPattern={[2, 2]}
                    >
                      <AutoLayout
                        name="Title"
                        overflow="visible"
                        spacing={10}
                        verticalAlignItems="center"
                      >
                        <Frame name="Component Icon" width={16} height={16}>
                          <SVG
                            name="Vector"
                            x={{
                              type: "horizontal-scale",
                              leftOffsetPercent: 0,
                              rightOffsetPercent: 0,
                            }}
                            y={{
                              type: "vertical-scale",
                              topOffsetPercent: 0,
                              bottomOffsetPercent: 0,
                            }}
                            height={16}
                            width={16}
                            src="<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <path fill-rule='evenodd' clip-rule='evenodd' d='M4.50044 3.50044L5.12889 4.12889L7.37156 6.37156L8 7L8.62844 6.37156L10.8711 4.12889L11.4996 3.50044L10.8711 2.87111L8.62844 0.628444L8 0L7.37156 0.628444L5.12889 2.87111L4.50044 3.50044ZM4.50044 12.4996L5.12889 13.1289L7.37156 15.3716L8 16L8.62844 15.3716L10.8711 13.1289L11.4996 12.5004L10.8711 11.8711L8.62844 9.62844L8 9L7.37156 9.62844L5.12889 11.8711L4.50044 12.4996ZM0.628444 8.62844L0 8L0.628444 7.37156L2.87111 5.12889L3.50044 4.50044L4.12889 5.12889L6.37156 7.37156L7 8L6.37156 8.62844L4.12889 10.8711L3.50044 11.4996L2.87111 10.8711L0.628444 8.62844ZM9 8L9.62844 8.62844L11.8711 10.8711L12.4996 11.4996L13.1289 10.8711L15.3716 8.62844L16 8L15.3716 7.37156L13.1289 5.12889L12.5004 4.50044L11.8711 5.12889L9.62844 7.37156L9 8Z' fill='#1A1A1A'/>
  </svg>
  "
                          />
                        </Frame>
                        <Text
                          name="Component-title"
                          fill="#030303"
                          fontSize={14}
                          fontWeight={700}
                        >
                          Button Label
                        </Text>
                        <AutoLayout
                          name="Close-icon-button"
                          overflow="visible"
                          spacing={10}
                          padding={2}
                        >
                          <Close24Px name="close_24px" />
                        </AutoLayout>
                      </AutoLayout>
                      <AutoLayout
                        name="Subject-list-group"
                        fill="#C6EFC4"
                        cornerRadius={6}
                        overflow="visible"
                        spacing={10}
                        padding={{
                          vertical: 2,
                          horizontal: 4,
                        }}
                        verticalAlignItems="center"
                      >
                        <AutoLayout
                          name="subject-group"
                          spacing={6}
                          verticalAlignItems="center"
                        >
                          <Text
                            name="subjects:"
                            fill="#000"
                            fontFamily="Roboto Mono"
                            fontSize={10}
                          >
                            subjects:
                          </Text>
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
                              name="actions"
                              fill="#1A1A1A"
                              fontFamily="Roboto Mono"
                              fontSize={10}
                            >
                              actions
                            </Text>
                          </AutoLayout>
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
                              name="actions"
                              fill="#1A1A1A"
                              fontFamily="Roboto Mono"
                              fontSize={10}
                            >
                              actions
                            </Text>
                          </AutoLayout>
                        </AutoLayout>
                      </AutoLayout>
                    </AutoLayout>
                    <AutoLayout
                      name="Component-Content"
                      stroke="#000"
                      strokeWidth={0}
                      overflow="visible"
                      direction="vertical"
                      spacing={6}
                      padding={{
                        top: 6,
                        right: 0,
                        bottom: 0,
                        left: 4,
                      }}
                      strokeDashPattern={[2, 2]}
                    >
                      <AutoLayout
                        name="Component-prop"
                        spacing={6}
                        verticalAlignItems="center"
                      >
                        <Text
                          name="fill:"
                          fill="#000"
                          fontFamily="Roboto Mono"
                          fontSize={12}
                        >
                          fill:
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
                            color.button.primary.default
                          </Text>
                        </AutoLayout>
                      </AutoLayout>
                      <AutoLayout
                        name="Component-prop"
                        spacing={6}
                        verticalAlignItems="center"
                      >
                        <Text
                          name="leftMargin:"
                          fill="#000"
                          fontFamily="Roboto Mono"
                          fontSize={12}
                        >
                          leftMargin:
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
                            color.button.primary.default
                          </Text>
                        </AutoLayout>
                      </AutoLayout>
                    </AutoLayout>
                  </AutoLayout>
                </AutoLayout>
              </AutoLayout>
            </AutoLayout>
          </AutoLayout>
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
}
