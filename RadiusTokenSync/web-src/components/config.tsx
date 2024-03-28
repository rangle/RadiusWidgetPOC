import { h, FunctionalComponent } from "preact";
import {
  Text,
  Stack,
  Textbox,
  Layer,
  IconCode16,
} from "@create-figma-plugin/ui";

export const ConfigForm: FunctionalComponent = () => {
  return (
    <Stack space="medium">
      <Layer icon={<IconCode16 />} value={false}>
        <Text>Configure Repository to Export Tokens</Text>
      </Layer>
      <Layer icon={<IconCode16 />} value={false}>
        <Textbox value="test"></Textbox>
      </Layer>
      <Layer icon={<IconCode16 />} value={false}>
        <Textbox value="test"></Textbox>
      </Layer>
      <Layer icon={<IconCode16 />} value={false}>
        <Textbox value="test"></Textbox>
      </Layer>
    </Stack>
  );
};
