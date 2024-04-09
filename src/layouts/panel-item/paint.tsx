import { Box, Flex, Grid, GridItem, IconButton } from "@chakra-ui/react";
import Brush from "../../components/brush";
import TextureSelection from "../../components/texture-selection";
import { useState } from "react";
import useTexturePaint from "../../hooks/use-texture-paint";
import store from "../../store";
import { FaSprayCanSparkles } from "react-icons/fa6";

function Paint() {
  const { setBrushSize, setBrushFade } = useTexturePaint();
  const { isTexturePaintMode } = store();
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

  return (
    <Flex flexDirection={"column"} gap="10px">
      <Brush
        canvas={null}
        textures={null}
        onFadeUpdate={handleFadeUpdate}
        onSizeUpdate={handleSizeUpdate}
      />
      <Grid templateColumns="repeat(4, 1fr)" gap={"3px"}>
        <GridItem>
          <IconButton
            icon={<FaSprayCanSparkles />}
            aria-label="TexturePaint"
            variant={"outline"}
            border={`2px solid ${
              isTexturePaintMode ? "#fff" : "rgba(255, 255, 255, 0.5)"
            }`}
            background="#000"
            _hover={{ background: "none" }}
            color={isTexturePaintMode ? "#fff" : "rgba(255, 255, 255, 0.5)"}
            onClick={() =>
              store.setState({ isTexturePaintMode: !isTexturePaintMode })
            }
          />
        </GridItem>
      </Grid>
      <TextureSelection />
    </Flex>
  );
}

export default Paint;
