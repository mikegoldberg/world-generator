import { Accordion, Box } from "@chakra-ui/react";
import Weather from "./panel-item/weather";
import Water from "./panel-item/water";
import Paint from "./panel-item/paint";
import Sculpt from "./panel-item/sculpt";
import PanelItem from "./panel-item";
import BaseTerrain from "./panel-item/base-terrain";

function LeftPanel() {
  return (
    <Box width="240px" background={"gray.900"} overflow="auto">
      <Accordion allowMultiple allowToggle={false} defaultIndex={[0, 1, 2, 3]}>
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
