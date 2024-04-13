import { Flex, Grid, GridItem } from "@chakra-ui/react";
import Brush from "../../components/brush";
import TextureSelection from "../../components/texture-selection";
import { useState } from "react";
import useTexturePaint from "../../hooks/use-texture-paint";
import store from "../../store";

function TexturePaint() {
  const { isTexturePaintMode } = store();
  const { setBrushSize, setBrushFade } = useTexturePaint();
  const [size, setSize] = useState(100);
  const [fade, setFade] = useState(0.5);

  function handleFadeChanged(fade: number) {
    setFade(fade);
    setBrushFade(fade);

    if (isTexturePaintMode) {
      store.setState({ activeBrushFade: fade });
    }
  }

  function handleSizeChanged(size: number) {
    setSize(size);
    setBrushSize(size);

    if (isTexturePaintMode) {
      store.setState({ activeBrushSize: size });
    }
  }

  return (
    <>
      <Flex flexDirection={"column"} gap="10px">
        <Brush
          size={size}
          fade={fade}
          onFadeChanged={handleFadeChanged}
          onSizeChanged={handleSizeChanged}
          maxFade={1}
          maxSize={200}
        />
        <Grid templateColumns="repeat(4, 1fr)" gap={"3px"}>
          <GridItem></GridItem>
        </Grid>
        <TextureSelection />
      </Flex>
      {/* debug items go here <Portal></Portal> */}
    </>
  );
}

export default TexturePaint;
