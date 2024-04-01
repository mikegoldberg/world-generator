import { Canvas } from "@react-three/fiber";
import Terrain from "./components/terrain";
import { CameraControls } from "@react-three/drei";
import Camera from "./components/camera";
import { Color } from "three";
function Stage({}: any) {
  return (
    <Canvas
      shadows
      scene={{ background: new Color(0, 0, 0) }}
      gl={{ localClippingEnabled: true }}
    >
      <Camera />
      <CameraControls makeDefault />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[2, 2, 4]}
        intensity={2}
        castShadow={true}
        shadow-mapSize-width={32}
        shadow-mapSize-height={32}
      />
      <Terrain />
    </Canvas>
  );
}

export default Stage;
