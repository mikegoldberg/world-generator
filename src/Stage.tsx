import { Canvas } from "@react-three/fiber";
import Terrain from "./components/terrain";
import { CameraControls } from "@react-three/drei";
import Camera from "./components/camera";
import { Color } from "three";
import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import { TerrainContext } from "./context/terrain";

function Stage() {
  const { isSculptMode } = useContext(TerrainContext);

  return (
    <Box
      userSelect="none"
      width="100%"
      top={0}
      position="absolute"
      height="100vh"
      bg="#ddd"
    >
      <Canvas
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
      </Canvas>
    </Box>
  );
}

export default Stage;
