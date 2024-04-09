import { useCallback, useEffect, useRef, useState } from "react";
import store from "../store";
import { CanvasTexture, TextureLoader } from "three";
import { useConst } from "@chakra-ui/react";

function useTexturePaint() {
  const { activeTextureName, mousePosition, isTexturePainting } = store();
  const textureSize = useConst({ x: 1024, y: 1024 });
  const terrainTexture = useRef(document.createElement("canvas"));
  const bufferedTerrainTexture = useRef(document.createElement("canvas"));
  const brush = useRef(document.createElement("canvas"));
  const [sourceTexture, setSourceTexture] = useState<any>(null);
  const [brushSize, setBrushSize] = useState(80);
  const [brushFade, setBrushFade] = useState(0);

  useEffect(() => {
    if (isTexturePainting) {
      setBrushTexture(40, 40);
      drawTexture();
    }
  }, [isTexturePainting, mousePosition]);

  useEffect(() => {
    terrainTexture.current.width = textureSize.x;
    terrainTexture.current.height = textureSize.y;

    store.setState({
      terrainAlbedo: new CanvasTexture(terrainTexture.current),
    });
  }, []);

  useEffect(() => {
    const ctx = bufferedTerrainTexture.current.getContext("2d");

    if (sourceTexture && ctx) {
      const src = sourceTexture.source.data;
      const padding = brushSize / 2;

      bufferedTerrainTexture.current.width = src.width + brushSize;
      bufferedTerrainTexture.current.height = src.height + brushSize;

      ctx.drawImage(src, src.width * -1 + padding, src.height * -1 + padding);
      ctx.drawImage(src, padding, src.height * -1 + padding);
      ctx.drawImage(src, src.width + padding, src.height * -1 + padding);
      ctx.drawImage(src, src.width * -1 + padding, padding);
      ctx.drawImage(src, padding, padding);
      ctx.drawImage(src, src.width + padding, padding);
      ctx.drawImage(src, src.width * -1 + padding, src.height + padding);
      ctx.drawImage(src, padding, src.height + padding);
      ctx.drawImage(src, src.width + padding, src.height + padding);
    }
  }, [brushSize, sourceTexture, bufferedTerrainTexture]);

  useEffect(() => {
    if (activeTextureName) {
      const loader = new TextureLoader();
      loader.load(`./textures/${activeTextureName}`, setSourceTexture);
    }
  }, [activeTextureName]);

  useEffect(() => {
    fetch("./textures.json")
      .then((r) => r.json())
      .then((files) => {
        const textures = files.filter((name: string) =>
          name.toLowerCase().includes("color")
        );

        store.setState({
          textures,
        });
      });
  }, []);

  const resetBrush = useCallback(() => {
    const ctx = brush.current.getContext("2d");
    const padding = brushSize / 2;

    if (!ctx) {
      return;
    }

    ctx.reset();
    ctx.beginPath();
    const radialGradient = ctx.createRadialGradient(
      padding,
      padding,
      0,
      padding,
      padding,
      padding
    );
    radialGradient.addColorStop(0, "rgba(0, 0, 0, .2)"); // alpha sets opacity of brush
    radialGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = radialGradient;
    ctx.arc(padding, padding, padding, Math.PI * 2, 0);
    ctx.fill();
    ctx.globalCompositeOperation = "source-in";
  }, [brushSize, brush.current]);

  const setBrushTexture = useCallback(
    (x: number, y: number) => {
      resetBrush();
      const ctx = brush.current.getContext("2d");

      ctx?.drawImage(
        bufferedTerrainTexture.current,
        ((x % 200) + 40) * -1,
        ((y % 200) + 40) * -1
      );
    },
    [brush.current, bufferedTerrainTexture.current]
  );

  function drawTexture() {
    // const x = e.offsetX;
    // const y = e.offsetY;

    const ctx = terrainTexture.current.getContext("2d");
    ctx?.drawImage(brush.current, 100, 100);

    store.setState({
      terrainAlbedo: new CanvasTexture(terrainTexture.current),
    });
  }

  return { setBrushSize, setBrushFade, bufferedTerrainTexture };
}

export default useTexturePaint;
