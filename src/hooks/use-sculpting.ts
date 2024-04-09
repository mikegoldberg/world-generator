import { useEffect, useRef } from "react";
import store from "../store";

function useSculpting() {
  const { isSculptMode, isSculpting, mousePosition } = store();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;

    canvasRef.current = canvas;
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      if (!ctx) {
        return;
      }

      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.rect(0, 0, 1024, 1024);
      ctx.fill();
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current && mousePosition && isSculptMode && isSculpting) {
      const ctx = canvasRef.current.getContext("2d");

      if (!ctx) {
        return;
      }

      const y = (1024 / 8) * (mousePosition.point.z + 4);
      const x = (1024 / 8) * (mousePosition.point.x + 4);

      ctx.fillStyle = "rgba(255, 255, 255, 0.01)";
      ctx.beginPath();
      ctx.arc(x, y, 100, 0, 2 * Math.PI);
      ctx.fill();

      store.setState({ modificationLayer: ctx.getImageData(0, 0, 1024, 1024) });
    }
  }, [mousePosition, isSculptMode, isSculpting]);

  return {};
}

export default useSculpting;
