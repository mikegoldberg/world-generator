import { IconButton } from "@chakra-ui/react";
import { useContext, useEffect, useRef } from "react";
import { PiBezierCurve } from "react-icons/pi";
import { TerrainContext } from "../../context/terrain";

function TerrainSculptingIcon() {
  const { isSculptMode, setIsSculptMode, setModificationLayer, mousePosition } =
    useContext(TerrainContext);
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
    if (canvasRef.current && mousePosition) {
      const ctx = canvasRef.current.getContext("2d");

      if (!ctx) {
        return;
      }

      const y = (1024 / 8) * (mousePosition.point.z + 4);
      const x = (1024 / 8) * (mousePosition.point.x + 4);

      ctx.fillStyle = "#333";
      ctx.beginPath();
      ctx.arc(x, y, 100, 0, 2 * Math.PI);
      ctx.fill();

      setModificationLayer(ctx.getImageData(0, 0, 1024, 1024));
    }
  }, [mousePosition]);

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
        icon={<PiBezierCurve />}
        aria-label="sculpt"
        borderRadius="50%"
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

export default TerrainSculptingIcon;
