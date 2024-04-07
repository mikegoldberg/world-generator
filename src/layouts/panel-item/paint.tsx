import { Flex, Grid, GridItem } from "@chakra-ui/react";
import TextureBrush from "../../components/brushes/texture";
import Brush from "../../components/brush";
// import AddTexture from "../../components/add-texture";
import TextureSelection from "../../components/texture-selection";

function Paint() {
  return (
    <Flex flexDirection={"column"} gap="10px">
      <Brush canvas={null} textures={null} />
      <Grid templateColumns="repeat(4, 1fr)" gap={"3px"}>
        <GridItem>
          <TextureBrush />
        </GridItem>
        {/* <GridItem>
          <AddTexture />
        </GridItem> */}
      </Grid>
      <TextureSelection />
    </Flex>
  );
}

export default Paint;
