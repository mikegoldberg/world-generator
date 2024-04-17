import { useContext, useEffect, useRef } from "react";
import { TextureContext } from "../texture";
import { BrushContext } from "..";

function SamplerTexture() {
  const { textureSize, brushSize } = useContext(BrushContext);
  const { sourceTexture, setSamplerTexture } = useContext(TextureContext);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (!sourceTexture || !canvasRef.current || !ctx) {
      return;
    }

    const src = sourceTexture;
    const srcW = textureSize.x;
    const srcH = textureSize.y;
    const pad = brushSize / 2;

    canvasRef.current.width = srcW + brushSize;
    canvasRef.current.height = srcH + brushSize;

    const segments = {
      topLeft: [srcW * -1 + pad, srcH * -1 + pad],
      top: [pad, srcH * -1 + pad],
      topRight: [srcW + pad, srcH * -1 + pad],
      left: [srcW * -1 + pad, pad],
      center: [pad, pad],
      right: [srcW + pad, pad],
      bottomLeft: [srcW * -1 + pad, srcH + pad],
      bottom: [pad, srcH + pad],
      bottomRight: [srcW + pad, srcH + pad],
    };

    Object.values(segments).forEach(([x, y]: number[]) => {
      ctx.drawImage(src, x, y);
    });

    setSamplerTexture(canvasRef.current);
  }, [brushSize, sourceTexture, canvasRef]);

  return <canvas ref={canvasRef} />;
}

export default SamplerTexture;
