const { widget } = figma;
const { Text, AutoLayout, useSyncedState } = widget;
import { TokenUse } from "../common/token.types";
import { TokenError, validateTokenName } from "../common/token.utils";
import { Icon16px } from "./icon";

export type PropUsage = {
  prop: TokenUse;
};
export const PropDocs: FunctionalWidget<PropUsage> = ({ prop }) => {
  const [errs, setErrs] = useSyncedState<TokenError[]>(prop.value, []);
  return (
    <>
      <AutoLayout name="Component-prop" spacing={6} verticalAlignItems="center">
        <Text
          name="prop-name"
          fill="#000"
          fontFamily="Roboto Mono"
          fontSize={12}
        >
          {prop.name}:
        </Text>
        <PropValue
          type={prop.from}
          value={prop.value}
          showErrors={(errs) => setErrs(errs)}
        />
      </AutoLayout>
      {errs.length > 0 ? (
        <AutoLayout
          name="PropValue"
          width={"hug-contents"}
          fill={"#FFa9a3"}
          cornerRadius={6}
          overflow="visible"
          padding={6}
          verticalAlignItems="center"
        >
          {errs.map((err) => (
            <AutoLayout direction="vertical" height={"hug-contents"}>
              <AutoLayout direction="horizontal">
                <Text fontSize={8} fill={"#777777"}>
                  [{err.key}]
                </Text>
              </AutoLayout>
              <AutoLayout direction="horizontal">
                <Text fontSize={14} fontWeight={"bold"}>
                  {err.title}
                </Text>
              </AutoLayout>
              <AutoLayout direction="horizontal">
                <Text fontSize={12}>{err.message}</Text>
              </AutoLayout>
            </AutoLayout>
          ))}
        </AutoLayout>
      ) : (
        <></>
      )}
    </>
  );
};

export type PropValueType = {
  type: "variable" | "token studio";
  value: string;
  showErrors: (errs: TokenError[]) => void;
};

export const PropValue: FunctionalWidget<PropValueType> = ({
  type,
  value,
  showErrors,
}) => {
  const [renderedName, valid] = validateTokenName(value, showErrors);
  return (
    <>
      <AutoLayout
        name="PropValue"
        fill={valid ? "#C4D8F3" : "#F2C94C73"}
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
        <Icon16px icon={type === "variable" ? "variables" : "tokens"} />

        <AutoLayout
          name="PropertyValue"
          fill="#D3E6FF"
          cornerRadius={{
            topLeft: 0,
            topRight: 6,
            bottomRight: 6,
            bottomLeft: 0,
          }}
          overflow="visible"
          spacing={0}
          padding={4}
          verticalAlignItems="center"
        >
          {renderedName}
        </AutoLayout>
      </AutoLayout>
    </>
  );
};
