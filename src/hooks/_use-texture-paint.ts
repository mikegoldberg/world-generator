import { useCallback, useContext, useEffect, useRef, useState } from "react";
import store from "../store";
import { CanvasTexture, TextureLoader } from "three";
import { useConst } from "@chakra-ui/react";
import TextureContext from "../components/texture-paint/texture-context";

function useTexturePaint() {
  const { sourceTexture } = useContext(TextureContext);
  const defaultColor = useConst("#11aa33");
  const { mousePosition, isTexturePainting, isTexturePaintMode } = store();
  // const [textureSize, setTextureSize] = useState({ x: 1024, y: 1024 });
  const terrainTexture = useRef(document.createElement("canvas"));
  const brush = useRef(document.createElement("canvas"));
  const [brushSize, setBrushSize] = useState(180);
  const [brushFade, setBrushFade] = useState(0);
  const [isDebugTextures, setIsDebugTextures] = useState(false);

  useEffect(() => {
    if (isTexturePainting) {
      setBrushTexture();
      drawTexture();
    }
  }, [isTexturePainting, mousePosition]);

  useEffect(() => {
    if (isTexturePaintMode) {
      setBrushTexture();
    }
  }, [brushSize, brushFade]);

  useEffect(() => {
    terrainTexture.current.width = textureSize.x;
    terrainTexture.current.height = textureSize.y;

    const ctx = terrainTexture.current.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.fillStyle = defaultColor;
    ctx.fillRect(0, 0, textureSize.x, textureSize.y);

    store.setState({
      terrainAlbedo: terrainTexture.current,
    });
  }, []);

  /*
  useEffect(() => {
    // display passes for debugging
    if (!terrainTexture.current || !sourceTexture || !isDebugTextures) {
      return;
    }

    const sourceTextureImage = sourceTexture.source.data;
    sourceTextureImage.style.position = "fixed";
    sourceTextureImage.style.top = "10px";
    sourceTextureImage.style.left = "250px";
    sourceTextureImage.style.width = "150px";
    document.body.appendChild(sourceTextureImage);

    bufferedTerrainTexture.current.style.position = "fixed";
    bufferedTerrainTexture.current.style.top = "170px";
    bufferedTerrainTexture.current.style.left = "250px";
    bufferedTerrainTexture.current.style.width = "150px";
    document.body.appendChild(bufferedTerrainTexture.current);

    terrainTexture.current.style.position = "fixed";
    terrainTexture.current.style.top = "330px";
    terrainTexture.current.style.left = "250px";
    terrainTexture.current.style.width = "150px";
    terrainTexture.current.style.height = "150px";
    document.body.appendChild(terrainTexture.current);

    brush.current.style.position = "fixed";
    brush.current.style.top = "490px";
    brush.current.style.left = "250px";
    brush.current.style.height = "150px";
    brush.current.style.width = "150px";
    document.body.appendChild(brush.current);
  }, [brush.current, terrainTexture.current, sourceTexture]);
  */

  const resetBrush = useCallback(() => {
    const ctx = brush.current.getContext("2d");
    const radius = brushSize / 2;

    if (!ctx) {
      return;
    }

    brush.current.width = brushSize;
    brush.current.height = brushSize;

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
  }, [brushSize, brushFade, brush.current]);

  const setBrushTexture = useCallback(() => {
    resetBrush();

    if (!mousePosition) {
      return;
    }

    const { uv } = mousePosition;
    const x = textureSize.x * uv.x - brushSize / 2;
    const y = textureSize.y * (1 - uv.y) - brushSize / 2;
    const ctx = brush.current.getContext("2d");

    ctx?.drawImage(
      bufferedTerrainTexture.current,
      ((x % bufferedTerrainTexture.current.width) + brushSize / 2) * -1,
      ((y % bufferedTerrainTexture.current.height) + brushSize / 2) * -1
    );
  }, [brushSize, brush.current, bufferedTerrainTexture.current, mousePosition]);

  function drawTexture() {
    if (!mousePosition) {
      return;
    }
    const { uv } = mousePosition;
    const ctx = terrainTexture.current.getContext("2d");

    ctx?.drawImage(
      brush.current,
      textureSize.x * uv.x - brushSize / 2,
      textureSize.y * (1 - uv.y) - brushSize / 2
    );
    store.setState({
      terrainAlbedo: terrainTexture.current,
    });
  }

  return { setBrushSize, setBrushFade, bufferedTerrainTexture };
}

export default useTexturePaint;
