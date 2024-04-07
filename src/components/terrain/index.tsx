import { useContext, useEffect, useRef, useState } from "react";
import {
  MathUtils,
  MeshPhysicalMaterial,
  RepeatWrapping,
  TextureLoader,
  Vector2,
} from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import { TerrainContext } from "../../context/terrain";
import groundShader from "../../shaders/ground";
import { useFrame, useLoader } from "@react-three/fiber";

function Terrain() {
  const {
    displacementMap,
    displacementScale,
    modificationLayer,
    isSculptMode,
    mousePosition,
    setMousePosition,
    setIsSculpting,
  } = useContext(TerrainContext);
  const planeRef = useRef<any>();
  const shaderRef = useRef<any>();
  const [uniforms, setUniforms] = useState<any>({
    uMouse: { value: new Vector2(0, 0) },
    uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
    uBrushEnabled: { value: false },
    uGrassAlbedo: { value: null },
  });

  useEffect(() => {
    setUniforms({
      ...uniforms,
      uBrushEnabled: {
        value: isSculptMode,
      },
    });
  }, [isSculptMode]);

  const [grassColor, normalMap] = useLoader(TextureLoader, [
    "./textures/Grass004_1K-JPG_Color.jpg",
    "./textures/Grass004_1K-JPG_NormalGL.jpg",
  ]);

  useEffect(() => {
    if (grassColor && normalMap) {
      grassColor.wrapS = RepeatWrapping;
      grassColor.wrapT = RepeatWrapping;
      grassColor.repeat = new Vector2(4, 4);
      normalMap.wrapS = RepeatWrapping;
      normalMap.wrapT = RepeatWrapping;
      normalMap.repeat = new Vector2(4, 4);
    }
    setUniforms({
      ...uniforms,
      uGrassAlbedo: {
        value: grassColor,
      },
    });
  }, [grassColor, normalMap]);

  useEffect(() => {
    if (planeRef.current) {
      const geometry = planeRef.current;
      const positions = geometry.attributes.position.array;
      const width = geometry.parameters.widthSegments + 1;
      const height = geometry.parameters.heightSegments + 1;
      const widthStep = displacementMap.width / width;
      const heightStep = displacementMap.height / height;

      for (let i = 0; i < positions.length; i += 3) {
        const x = Math.floor(((i / 3) % width) * widthStep);
        const y = Math.floor((i / 3 / width) * heightStep);
        const srcIdx = x * 4 + y * 4 * displacementMap.width;
        const displacement = displacementMap.data[srcIdx];
        const modifier = modificationLayer
          ? (modificationLayer.data[srcIdx] / 255) * displacementScale
          : 0;

        positions[i + 2] = (displacement / 255) * displacementScale + modifier;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  }, [planeRef.current, displacementScale, displacementMap, modificationLayer]);

  useFrame(() => {
    if (mousePosition) {
      shaderRef.current.uniforms.uMouse.value = new Vector2(
        mousePosition.point.x,
        mousePosition.point.z
      );
    }
  });

  function handlePointerUp() {
    setIsSculpting(false);
  }

  function handlePointerDown() {
    setIsSculpting(true);
  }

  return (
    <>
      <mesh
        position={[0, displacementScale / 2, 0]}
        rotation={[MathUtils.DEG2RAD * -90, 0, 0]}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={setMousePosition}
        visible={false}
      >
        <planeGeometry args={[8, 8, 64, 64]} />
      </mesh>
      <mesh
        position={[0, 0, 0]}
        rotation={[MathUtils.DEG2RAD * -90, 0, 0]}
        receiveShadow={true}
      >
        <planeGeometry args={[8, 8, 64, 64]} ref={planeRef} />
        <CustomShaderMaterial
          ref={shaderRef}
          baseMaterial={MeshPhysicalMaterial}
          vertexShader={groundShader.vertexShader}
          fragmentShader={groundShader.fragmentShader}
          // map={grassColor}
          // normalMap={normalMap}
          // normalScale={new Vector2(0.3, 0.3)}
          // roughness={0}
          // metalness={0}
          silent
          uniforms={uniforms}
          color={0x555555}
          // wireframe={true}
        />
      </mesh>
    </>
  );
}

export default Terrain;
