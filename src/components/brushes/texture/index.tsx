import { IconButton } from "@chakra-ui/react";
import { useContext, useEffect, useRef } from "react";
import { TerrainContext } from "../../../context/terrain";
import { FaSprayCanSparkles } from "react-icons/fa6";

function TextureBrush() {
  const {
    isSculptMode,
    setIsSculptMode,
    isSculpting,
    setModificationLayer,
    mousePosition,
  } = useContext(TerrainContext);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

      setModificationLayer(ctx.getImageData(0, 0, 1024, 1024));
    }
  }, [mousePosition, isSculptMode, isSculpting]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={1024}
        height={1024}
        style={{
          display: "none",
          background: "#fff",
          zIndex: 120000,
          position: "absolute",
          top: 0,
          right: 0,
        }}
      />
      <IconButton
        icon={<FaSprayCanSparkles />}
        aria-label="sculpt"
        variant={"outline"}
        border={`2px solid ${
          isSculptMode ? "#fff" : "rgba(255, 255, 255, 0.5)"
        }`}
        background="#000"
        _hover={{ background: "none" }}
        color={isSculptMode ? "#fff" : "rgba(255, 255, 255, 0.5)"}
        onClick={() => setIsSculptMode(!isSculptMode)}
      />
    </>
  );
}

export default TextureBrush;
