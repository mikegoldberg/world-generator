import { Accordion, Box } from "@chakra-ui/react";
import Weather from "./panel-item/weather";
import Water from "./panel-item/water";
import Paint from "./panel-item/paint";
import Sculpt from "./panel-item/sculpt";
import PanelItem from "./panel-item";
import BaseTerrain from "./panel-item/base-terrain";
import usePreferences from "../hooks/use-preferences";

function LeftPanel() {
  const preferences = usePreferences();

  function handleAccordionChange(indexes: number[]) {
    preferences.set("panels-expanded", JSON.stringify(indexes));
  }

  return (
    <Box width="240px" background={"gray.900"} overflowY="scroll">
      <Accordion
        allowMultiple
        allowToggle={false}
        defaultIndex={JSON.parse(preferences.get("panels-expanded") || "[]")}
        onChange={handleAccordionChange}
      >
        <PanelItem label={"Base Terrain"}>
          <BaseTerrain />
        </PanelItem>

        <PanelItem label={"Sculpt"}>
          <Sculpt />
        </PanelItem>

        <PanelItem label={"Paint"}>
          <Paint />
        </PanelItem>

        <PanelItem label={"Water"}>
          <Water />
        </PanelItem>

        <PanelItem label={"Weather"}>
          <Weather />
        </PanelItem>
      </Accordion>
    </Box>
  );
}

export default LeftPanel;
