import { Flex, Grid, GridItem } from "@chakra-ui/react";
import SculptBrush from "../../components/brushes/sculpt";
import Brush from "../../components/brush";

function Sculpt() {
  return (
    <Flex flexDirection={"column"} gap="10px">
      <Brush canvas={null} textures={null} />
      <Grid>
        <GridItem>
          <SculptBrush />
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default Sculpt;
