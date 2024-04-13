import { Flex, Grid, GridItem } from "@chakra-ui/react";
import Brush from "../../components/brush";
import { useState } from "react";
import useSculpting from "../../hooks/use-sculpting";
import store from "../../store";

function Sculpt() {
  useSculpting();
  const { isSculptMode } = store();
  const [size, setSize] = useState(100);
  const [fade, setFade] = useState(0.5);

  function handleFadeChanged(fade: number) {
    setFade(fade);
    // setBrushFade(fade);

    if (isSculptMode) {
      store.setState({ activeBrushFade: fade });
    }
  }

  function handleSizeChanged(size: number) {
    setSize(size);
    // setBrushSize(size);

    if (isSculptMode) {
      store.setState({ activeBrushSize: size });
    }
  }

  return (
    <Flex flexDirection={"column"} gap="10px">
      <Brush
        size={size}
        fade={fade}
        maxSize={200}
        maxFade={1}
        onFadeChanged={handleFadeChanged}
        onSizeChanged={handleSizeChanged}
      />
      <Grid>
        <GridItem></GridItem>
      </Grid>
    </Flex>
  );
}

export default Sculpt;
