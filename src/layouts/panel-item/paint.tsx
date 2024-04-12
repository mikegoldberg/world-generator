import { Flex, Grid, GridItem } from "@chakra-ui/react";
import Brush from "../../components/brush";
import TextureSelection from "../../components/texture-selection";
import { useEffect, useState } from "react";
import useTexturePaint from "../../hooks/use-texture-paint";
import store from "../../store";

function Paint() {
  const { isTexturePaintMode } = store();
  const { setBrushSize, setBrushFade } = useTexturePaint();
  const [size, setSize] = useState(0);
  const [fade, setFade] = useState(0);

  function handleFadeUpdate(value: number) {
    setFade(value);
    setBrushFade(value);
  }

  function handleSizeUpdate(value: number) {
    setSize(value);
    setBrushSize(value);
  }

  useEffect(() => {
    if (isTexturePaintMode) {
      store.setState({ activeBrushSize: size, activeBrushFade: fade });
    }
  }, [isTexturePaintMode, size, fade]);

  return (
    <Flex flexDirection={"column"} gap="10px">
      <Brush onFadeUpdate={handleFadeUpdate} onSizeUpdate={handleSizeUpdate} />
      <Grid templateColumns="repeat(4, 1fr)" gap={"3px"}>
        <GridItem></GridItem>
      </Grid>
      <TextureSelection />
    </Flex>
  );
}

export default Paint;
