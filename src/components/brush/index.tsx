import { Box, Flex, useConst } from "@chakra-ui/react";
import { Texture } from "three";
import SliderControl from "../controls/slider";
import { useEffect, useRef, useState } from "react";

interface BrushProps {
  canvas: null | HTMLCanvasElement;
  textures?: null | Texture[];
  onCanvasUpdate: Function;
}

function Brush({ canvas, textures = null, onCanvasUpdate }: BrushProps) {
  const [size, setSize] = useState(80);
  const [fade, setFade] = useState(0.5);
  const maxSize = useConst(200);
  const maxFade = useConst(1.0);
  const brush = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    resetBrush();
  }, [brush, size]);

  useEffect(() => {
    console.log(canvas, textures);
  }, []);

  function resetBrush() {
    const ctx = brush.current?.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.reset();
    ctx.beginPath();
    const radius = size / 2;
    const radialGradient = ctx.createRadialGradient(
      radius,
      radius,
      0,
      radius,
      radius,
      radius
    );
    radialGradient.addColorStop(0, "rgba(255, 155, 0, 1)");
    radialGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = radialGradient;
    ctx.arc(radius, radius, radius, Math.PI * 2, 0);
    ctx.fill();
    ctx.globalCompositeOperation = "source-in";
  }

  return (
    <Box
      padding="10px"
      background={"rgba(0, 0, 0, 0.1)"}
      border={"1px solid rgba(255, 255, 255, .1)"}
    >
      <Flex height="100px" gap="8px">
        <Flex
          height="100px"
          width="100px"
          justifyContent="center"
          alignItems="center"
          border={"1px solid rgba(255, 255, 255, 0.04)"}
          position="relative"
          _before={{
            content: '" "',
            position: "absolute",
            left: "50%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.04)",
            width: "1px",
          }}
          _after={{
            content: '" "',
            position: "absolute",
            top: "50%",
            height: "1px",
            width: "100%",
            background: "rgba(255, 255, 255, 0.04)",
          }}
        >
          <Box
            borderRadius="50%"
            width={`${(size / maxSize) * 80}px`}
            height={`${(size / maxSize) * 80}px`}
            border="1px solid rgba(255, 255, 255, 0.5)"
          />
          <Box
            borderRadius="50%"
            position="absolute"
            width={`${(size / maxSize) * 80 * fade}px`}
            height={`${(size / maxSize) * 80 * fade}px`}
            border="1px solid rgba(255, 255, 255, 0.2)"
          />
        </Flex>
        <Flex gap="12px" flex={1}>
          <SliderControl
            label="Size"
            max={maxSize}
            min={40}
            step={1}
            defaultValue={size}
            orientation="vertical"
            onChange={setSize}
          />
          <SliderControl
            label="Fade"
            max={maxFade}
            min={0}
            step={0.05}
            defaultValue={fade}
            orientation="vertical"
            onChange={setFade}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default Brush;
