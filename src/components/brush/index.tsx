import { Box, Flex } from "@chakra-ui/react";
import SliderControl from "../controls/slider";
import Preview from "./preview";

interface BrushProps {
  onSizeChanged: (value: number) => void;
  onFadeChanged: (value: number) => void;
  onScaleChanged: (value: number) => void;
  size: number;
  fade: number;
  scale: number;
  maxSize: number;
  maxFade: number;
  maxScale: number;
  children?: any;
}

function Brush({
  size = 80,
  fade = 0.5,
  scale = 1,
  maxSize = 200,
  maxScale = 8,
  maxFade = 0.5,
  onSizeChanged,
  onFadeChanged,
  onScaleChanged,
  children,
}: BrushProps) {
  return (
    <Box
      padding="10px"
      background={"rgba(0, 0, 0, 0.1)"}
      border={"1px solid rgba(255, 255, 255, .1)"}
    >
      <Flex gap="12px" flexDirection={"column"}>
        <Flex gap="6px">
          <Preview size={size} fade={fade} maxSize={maxSize} />
          {children}
        </Flex>
        <SliderControl
          label="Size"
          max={maxSize}
          min={40}
          step={1}
          value={size}
          onChange={onSizeChanged}
        />
        <SliderControl
          label="Fade"
          max={maxFade}
          min={0}
          step={0.05}
          value={fade}
          onChange={onFadeChanged}
        />
        <SliderControl
          label="Scale"
          max={maxScale}
          min={0}
          step={0.1}
          value={scale}
          onChange={onScaleChanged}
        />
      </Flex>
    </Box>
  );
}

export default Brush;
