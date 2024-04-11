import { useCallback, useEffect, useRef, useState } from "react";
import store from "../store";
import { CanvasTexture, TextureLoader } from "three";
import { useConst } from "@chakra-ui/react";

function useTexturePaint() {
  const defaultColor = useConst("#002288");
  const { activeTextureName, mousePosition, isTexturePainting } = store();
  const textureSize = useConst({ x: 1024, y: 1024 });
  const terrainTexture = useRef(document.createElement("canvas"));
  const bufferedTerrainTexture = useRef(document.createElement("canvas"));
  const brush = useRef(document.createElement("canvas"));
  const [sourceTexture, setSourceTexture] = useState<any>(null);
  const [brushSize, setBrushSize] = useState(180);
  const [brushFade, setBrushFade] = useState(0);

  useEffect(() => {
    if (isTexturePainting) {
      setBrushTexture();
      drawTexture();
    }
  }, [isTexturePainting, mousePosition]);

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
      terrainAlbedo: new CanvasTexture(terrainTexture.current),
    });
  }, []);

  useEffect(() => {
    //   // display passes for debugging
    //   if (!terrainTexture.current || !sourceTexture) {
    //     return;
    //   }

    //   const sourceTextureImage = sourceTexture.source.data;
    //   sourceTextureImage.style.position = "fixed";
    //   sourceTextureImage.style.top = "10px";
    //   sourceTextureImage.style.left = "250px";
    //   sourceTextureImage.style.width = "150px";
    //   document.body.appendChild(sourceTextureImage);

    //   bufferedTerrainTexture.current.style.position = "fixed";
    //   bufferedTerrainTexture.current.style.top = "170px";
    //   bufferedTerrainTexture.current.style.left = "250px";
    //   bufferedTerrainTexture.current.style.width = "150px";
    //   document.body.appendChild(bufferedTerrainTexture.current);

    //   terrainTexture.current.style.position = "fixed";
    //   terrainTexture.current.style.top = "330px";
    //   terrainTexture.current.style.left = "250px";
    //   terrainTexture.current.style.width = "150px";
    //   terrainTexture.current.style.height = "150px";
    //   document.body.appendChild(terrainTexture.current);

    brush.current.style.position = "fixed";
    brush.current.style.top = "330px";
    brush.current.style.left = "250px";
    brush.current.style.height = "150px";
    brush.current.style.width = "150px";
    document.body.appendChild(brush.current);
  }, [brush.current, terrainTexture.current, sourceTexture]);

  useEffect(() => {
    const ctx = bufferedTerrainTexture.current.getContext("2d");

    if (sourceTexture && ctx) {
      const src = sourceTexture.source.data;
      const srcW = textureSize.x;
      const srcH = textureSize.y;
      const pad = brushSize / 2;

      bufferedTerrainTexture.current.width = srcW + brushSize;
      bufferedTerrainTexture.current.height = srcH + brushSize;

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
    const radius = brushSize / 2;

    if (!ctx) {
      return;
    }

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
    radialGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = radialGradient;
    ctx.arc(radius, radius, radius, Math.PI * 2, 0);
    ctx.fill();
    ctx.globalCompositeOperation = "source-in";
  }, [brushSize, brush.current]);

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
      ((x % 200) + brushSize / 2) * -1,
      ((y % 200) + brushSize / 2) * -1
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
      terrainAlbedo: new CanvasTexture(terrainTexture.current),
    });
  }

  return { setBrushSize, setBrushFade, bufferedTerrainTexture };
}

export default useTexturePaint;
