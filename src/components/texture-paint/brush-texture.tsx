import { useCallback, useContext, useEffect, useRef } from "react";
import TextureContext from "./texture-context";
import store from "../../store";

function BrushTexture() {
  const { isTexturePainting, isTexturePaintMode, mousePosition } = store();
  const {
    brushSize,
    brushFade,
    textureSize,
    samplerTextureRef,
    brushTextureRef,
  } = useContext(TextureContext);

  useEffect(() => {
    if (isTexturePainting && mousePosition) {
      setBrushTexture();
    }
  }, [isTexturePainting, mousePosition]);

  useEffect(() => {
    if (isTexturePaintMode) {
      setBrushTexture();
    }
  }, [brushSize, brushFade]);

  const resetBrush = useCallback(() => {
    const ctx = brushTextureRef.current.getContext("2d");
    const radius = brushSize / 2;

    if (!ctx) {
      return;
    }

    brushTextureRef.current.width = brushSize;
    brushTextureRef.current.height = brushSize;

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
  }, [brushSize, brushFade, brushTextureRef.current]);

  const setBrushTexture = useCallback(() => {
    resetBrush();

    if (!mousePosition) {
      return;
    }

    const { uv } = mousePosition;
    const x = textureSize.x * uv.x - brushSize / 2;
    const y = textureSize.y * (1 - uv.y) - brushSize / 2;
    const ctx = brushTextureRef.current.getContext("2d");

    ctx?.drawImage(
      samplerTextureRef.current,
      ((x % samplerTextureRef.current.width) + brushSize / 2) * -1,
      ((y % samplerTextureRef.current.height) + brushSize / 2) * -1
    );
  }, [
    brushSize,
    brushTextureRef.current,
    samplerTextureRef.current,
    mousePosition,
  ]);

  return <canvas ref={brushTextureRef} />;
}

export default BrushTexture;
