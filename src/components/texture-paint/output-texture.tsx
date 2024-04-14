import { useContext, useEffect, useRef } from "react";
import store from "../../store";
import TextureContext from "./texture-context";

function OutputTexture() {
  const outputTextureRef = useRef<any>();
  const { isTexturePainting, mousePosition } = store();
  const { textureSize, brushTextureRef, brushSize, defaultColor } =
    useContext(TextureContext);

  useEffect(() => {
    if (isTexturePainting && mousePosition) {
      // setBrushTexture();
      drawTexture();
    }
  }, [isTexturePainting, mousePosition]);

  useEffect(() => {
    outputTextureRef.current.width = textureSize.x;
    outputTextureRef.current.height = textureSize.y;

    const ctx = outputTextureRef.current.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.fillStyle = defaultColor;
    ctx.fillRect(0, 0, textureSize.x, textureSize.y);

    store.setState({
      terrainAlbedo: outputTextureRef.current,
    });
  }, []);

  function drawTexture() {
    if (!mousePosition) {
      return;
    }
    const { uv } = mousePosition;
    const ctx = outputTextureRef.current.getContext("2d");

    ctx?.drawImage(
      brushTextureRef.current,
      textureSize.x * uv.x - brushSize / 2,
      textureSize.y * (1 - uv.y) - brushSize / 2
    );
    store.setState({
      terrainAlbedo: outputTextureRef.current,
    });
  }
  return <canvas ref={outputTextureRef} />;
}

export default OutputTexture;
