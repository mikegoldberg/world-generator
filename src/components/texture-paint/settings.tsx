import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { useContext } from "react";
import store from "../../store";
import Brush from "../brush";
import TextureSelection from "../texture-selection";
import { BrushContext } from ".";

function Options() {
  const {
    brushSize,
    setBrushSize,
    brushFade,
    setBrushFade,
    brushScale,
    setBrushScale,
  } = useContext(BrushContext);
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

  function handleScaleChanged(scale: number) {
    setBrushScale(scale);

    if (isTexturePaintMode) {
      store.setState({ activeBrushScale: scale });
    }
  }

  return (
    <>
      <Flex flexDirection={"column"} gap="10px">
        <Brush
          size={brushSize}
          fade={brushFade}
          scale={brushScale}
          onFadeChanged={handleFadeChanged}
          onSizeChanged={handleSizeChanged}
          onScaleChanged={handleScaleChanged}
          maxFade={1}
          maxSize={200}
          maxScale={8}
        >
          <TextureSelection />
        </Brush>
        <Grid templateColumns="repeat(4, 1fr)" gap={"3px"}>
          <GridItem></GridItem>
        </Grid>
      </Flex>
    </>
  );
}

export default Options;
