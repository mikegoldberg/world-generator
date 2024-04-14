import { useCallback, useContext, useEffect, useRef } from "react";
import { TextureContext } from "../";
import store from "../../../store";

function BrushTexture() {
  const { isTexturePainting, isTexturePaintMode, mousePosition } = store();
  const { brushSize, brushFade, textureSize, setBrushTexture, samplerTexture } =
    useContext(TextureContext);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const resetBrush = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (!canvasRef.current || !ctx) {
      return;
    }

    const radius = brushSize / 2;

    canvasRef.current.width = brushSize;
    canvasRef.current.height = brushSize;

    ctx.reset();
    ctx.beginPath();
    const radialGradient = ctx.createRadialGradient(
      radius,
      radius,
      0,
      radius,
      radius,
      radius
    );
    radialGradient.addColorStop(0, "rgba(0, 0, 0, 1)"); // alpha sets opacity of brush
    radialGradient.addColorStop(1.0 - brushFade, "rgba(0, 0, 0, 1)");
    radialGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = radialGradient;
    ctx.arc(radius, radius, radius, Math.PI * 2, 0);
    ctx.fill();
    ctx.globalCompositeOperation = "source-in";
  }, [brushSize, brushFade, canvasRef.current]);

  useEffect(() => {
    if (!mousePosition || !canvasRef.current || !isTexturePaintMode) {
      return;
    }

    resetBrush();

    const { uv } = mousePosition;
    const x = textureSize.x * uv.x - brushSize / 2;
    const y = textureSize.y * (1 - uv.y) - brushSize / 2;
    const ctx = canvasRef.current.getContext("2d");

    ctx?.drawImage(
      samplerTexture,
      ((x % samplerTexture.width) + brushSize / 2) * -1,
      ((y % samplerTexture.height) + brushSize / 2) * -1
    );

    setBrushTexture(canvasRef.current);
  }, [
    brushSize,
    brushFade,
    isTexturePaintMode,
    isTexturePainting,
    canvasRef.current,
    samplerTexture,
    mousePosition,
  ]);

  return <canvas ref={canvasRef} />;
}

export default BrushTexture;
