import { useContext, useEffect, useRef } from "react";
import TextureContext from "./texture-context";

function SamplerTexture() {
  const { sourceTextureRef, samplerTextureRef, textureSize, brushSize } =
    useContext(TextureContext);

  useEffect(() => {
    const ctx = samplerTextureRef.current.getContext("2d");

    if (sourceTextureRef.current && ctx) {
      const src = sourceTextureRef.current.source.data;
      const srcW = textureSize.x;
      const srcH = textureSize.y;
      const pad = brushSize / 2;

      samplerTextureRef.current.width = srcW + brushSize;
      samplerTextureRef.current.height = srcH + brushSize;

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
    }
  }, [brushSize, sourceTextureRef.current, samplerTextureRef]);

  return <canvas ref={samplerTextureRef} />;
}

export default SamplerTexture;
