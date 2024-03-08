import { ComponentUsage } from "../common/token.types";
import { PropDocs } from "./prop-docs";

const { widget } = figma;
const { Text, AutoLayout } = widget;

export type ComponentDocsProps = {
  usage: ComponentUsage | undefined;
};

export const EmptyComponentDocs = () => (
  <AutoLayout
    name="Component-group"
    overflow="visible"
    direction="vertical"
    spacing={6}
    padding={{
      vertical: 6,
      horizontal: 3,
    }}
  >
    <AutoLayout name="component-title" spacing={6} verticalAlignItems="center">
      <Text
        name="empty"
        fill="#030303"
        fontFamily="Roboto"
        fontSize={12}
        fontWeight={700}
      >
        No component selected
      </Text>
    </AutoLayout>
  </AutoLayout>
);

export const ComponentDocs: FunctionalWidget<ComponentDocsProps> = ({
  usage,
}) => {
  if (!usage) return <EmptyComponentDocs />;
  const { name, props, children } = usage;
  return (
    <AutoLayout
      name="Component-group"
      overflow="visible"
      direction="vertical"
      spacing={6}
      padding={{
        vertical: 6,
        horizontal: 3,
      }}
    >
      <AutoLayout
        name="component-title"
        spacing={6}
        verticalAlignItems="center"
      >
        <Text
          name={name}
          fill="#030303"
          fontFamily="Roboto"
          fontSize={12}
          fontWeight={700}
        >
          {name}
        </Text>
      </AutoLayout>
      {props.map((prop) => (
        <PropDocs prop={prop} />
      ))}
      {children.length > 0 && (
        <AutoLayout
          name="component-children"
          spacing={6}
          verticalAlignItems="center"
        >
          <Text name="&gt;" fill="#000" fontFamily="Roboto Mono" fontSize={12}>
            &gt;
          </Text>
          {children.map((subcomponent) => (
            <ComponentDocs usage={subcomponent} />
          ))}
        </AutoLayout>
      )}
    </AutoLayout>
  );
};
