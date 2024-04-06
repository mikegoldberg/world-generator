import { Canvas as ThreeCanvas } from "@react-three/fiber";
import Terrain from "../terrain";
import { CameraControls } from "@react-three/drei";
import Camera from "../camera";
import { Color } from "three";
import { useContext } from "react";
import { TerrainContext } from "../../context/terrain";

function Canvas() {
  const { isSculptMode } = useContext(TerrainContext);

  return (
    <ThreeCanvas
      shadows
      scene={{ background: new Color(0, 0, 0) }}
      gl={{ localClippingEnabled: true }}
    >
      <Camera />
      <CameraControls makeDefault enabled={!isSculptMode} />
      <ambientLight intensity={0.1} />
      <directionalLight
        position={[1, 2, 1]}
        intensity={3}
        castShadow={true}
        shadow-mapSize-width={312}
        shadow-mapSize-height={312}
      />
      <Terrain />
    </ThreeCanvas>
  );
}

export default Canvas;
