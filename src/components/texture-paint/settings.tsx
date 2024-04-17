import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { useContext, useState } from "react";
import store from "../../store";
import Brush from "../brush";
import TextureSelection from "../texture-selection";
import { BrushContext } from ".";

function Options() {
  const { brushSize, setBrushSize, brushFade, setBrushFade } =
    useContext(BrushContext);
  const { isTexturePaintMode } = store();

  function handleFadeChanged(fade: number) {
    setBrushFade(fade);

    if (isTexturePaintMode) {
      store.setState({ activeBrushFade: fade });
    }
  }

  function handleSizeChanged(size: number) {
    setBrushSize(size);

    if (isTexturePaintMode) {
      store.setState({ activeBrushSize: size });
    }
  }

  return (
    <>
      <Flex flexDirection={"column"} gap="10px">
        <Brush
          size={brushSize}
          fade={brushFade}
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
    </>
  );
}

export default Options;
