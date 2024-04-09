import { Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface PreviewProps {
  size: number;
  fade: number;
  maxSize: number;
}

function Preview({ size, fade, maxSize }: PreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    setRadius(size / 2);
  }, [size]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.reset();
    ctx.beginPath();
    ctx.arc(45, 45, (radius / maxSize) * 80, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(45, 45, (radius / maxSize) * 80, 0, 2 * Math.PI);
    var rad = ctx.createRadialGradient(
      45,
      45,
      (radius / maxSize) * 80 - (radius / maxSize) * 80 * fade,
      45,
      45,
      (radius / maxSize) * 80 + 0.01
    );
    rad.addColorStop(0, "rgba(255, 255, 255, .1)");
    rad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = rad;
    ctx.fill();
    ctx.closePath();
  }, [size, radius, fade, maxSize]);

  return (
    <Flex
      position="relative"
      border={"1px solid rgba(255, 255, 255, 0.04)"}
      background="rgba(0, 0, 0, 0.1)"
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
      alignItems={"center"}
      justifyContent={"center"}
    >
      <canvas width="90" height="90" ref={canvasRef} />
    </Flex>
  );
}

export default Preview;
