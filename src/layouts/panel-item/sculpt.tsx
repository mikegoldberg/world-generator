import { Flex, Grid, GridItem } from "@chakra-ui/react";
import SculptBrush from "../../components/brushes/sculpt";
import Brush from "../../components/brush";
import { useState } from "react";

function Sculpt() {
  const [size, setSize] = useState(0);
  const [fade, setFade] = useState(0);

  return (
    <Flex flexDirection={"column"} gap="10px">
      <Brush
        canvas={null}
        textures={null}
        onFadeUpdate={setFade}
        onSizeUpdate={setSize}
      />
      <Grid>
        <GridItem>
          <SculptBrush brushFade={fade} brushSize={size} />
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default Sculpt;
