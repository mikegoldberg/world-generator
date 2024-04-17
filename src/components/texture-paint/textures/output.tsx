import { useContext, useEffect, useRef } from "react";
import store from "../../../store";
import { TextureContext } from "../texture";
import { BrushContext } from "..";

function OutputTexture() {
  const { isTexturePainting, mousePosition } = store();
  const { textureSize, brushSize, defaultColor } = useContext(BrushContext);
  const { brushTexture, setOutput } = useContext(TextureContext);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (isTexturePainting && mousePosition) {
      // setBrushTexture();
      drawTexture();
    }
  }, [isTexturePainting, mousePosition]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    canvasRef.current.width = textureSize.x;
    canvasRef.current.height = textureSize.y;

    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.fillStyle = defaultColor;
    ctx.fillRect(0, 0, textureSize.x, textureSize.y);

    store.setState({
      albedo: canvasRef.current,
    });
  }, []);

  function drawTexture() {
    const ctx = canvasRef.current?.getContext("2d");

    if (!mousePosition || !ctx || !brushTexture) {
      return;
    }
    const { uv } = mousePosition;

    ctx?.drawImage(
      brushTexture,
      textureSize.x * uv.x - brushSize / 2,
      textureSize.y * (1 - uv.y) - brushSize / 2
    );

    setOutput(canvasRef.current);
  }
  return <canvas ref={canvasRef} />;
}

export default OutputTexture;
