import { Box, Flex } from "@chakra-ui/react";
import SliderControl from "../controls/slider";
import Preview from "./preview";

interface BrushProps {
  onSizeChanged: (value: number) => void;
  onFadeChanged: (value: number) => void;
  size: number;
  fade: number;
  maxSize: number;
  maxFade: number;
}

function Brush({
  size = 80,
  fade = 0.5,
  maxSize = 200,
  maxFade = 0.5,
  onSizeChanged,
  onFadeChanged,
}: BrushProps) {
  // const brush = useRef<HTMLCanvasElement | null>(null);

  // useEffect(() => {
  //   resetBrush();
  // }, [brush, size]);

  // function resetBrush() {
  //   const ctx = brush.current?.getContext("2d");

  //   if (!ctx) {
  //     return;
  //   }

  //   ctx.reset();
  //   ctx.beginPath();
  //   const radius = size / 2;
  //   const radialGradient = ctx.createRadialGradient(
  //     radius,
  //     radius,
  //     0,
  //     radius,
  //     radius,
  //     radius
  //   );
  //   radialGradient.addColorStop(0, "rgba(255, 155, 0, 1)");
  //   radialGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
  //   ctx.fillStyle = radialGradient;
  //   ctx.arc(radius, radius, radius, Math.PI * 2, 0);
  //   ctx.fill();
  //   ctx.globalCompositeOperation = "source-in";
  // }

  return (
    <Box
      padding="10px"
      background={"rgba(0, 0, 0, 0.1)"}
      border={"1px solid rgba(255, 255, 255, .1)"}
    >
      <Flex height="100px" gap="8px">
        <Preview size={size} fade={fade} maxSize={maxSize} />
        <Flex gap="12px" flex={1}>
          <SliderControl
            label="Size"
            max={maxSize}
            min={40}
            step={1}
            value={size}
            orientation="vertical"
            onChange={onSizeChanged}
          />
          <SliderControl
            label="Fade"
            max={maxFade}
            min={0}
            step={0.05}
            value={fade}
            orientation="vertical"
            onChange={onFadeChanged}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default Brush;
