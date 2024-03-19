import { Canvas } from "@react-three/fiber";
import Terrain from "./components/terrain";
import Camera from "./components/camera";

function Stage({}: any) {
  return (
    <Canvas shadows performance={{ min: 11 }}>
      <Camera />
      <ambientLight intensity={Math.PI / 2} />
      <directionalLight position={[2, 2, 12]} intensity={12} castShadow />
      <Terrain />
    </Canvas>
  );
}

export default Stage;
