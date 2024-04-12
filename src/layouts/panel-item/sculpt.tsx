import { Flex, Grid, GridItem } from "@chakra-ui/react";
import Brush from "../../components/brush";
import { useEffect, useState } from "react";
import useSculpting from "../../hooks/use-sculpting";
import store from "../../store";

function Sculpt() {
  useSculpting();
  const { isSculptMode } = store();
  const [size, setSize] = useState(0);
  const [fade, setFade] = useState(0);

  useEffect(() => {
    if (isSculptMode) {
      store.setState({ activeBrushSize: size, activeBrushFade: fade });
    }
  }, [isSculptMode, size, fade]);

  return (
    <Flex flexDirection={"column"} gap="10px">
      <Brush onFadeUpdate={setFade} onSizeUpdate={setSize} />
      <Grid>
        <GridItem></GridItem>
      </Grid>
    </Flex>
  );
}

export default Sculpt;
