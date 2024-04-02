import { useContext, useEffect, useRef, useState } from "react";
import { MathUtils, MeshPhysicalMaterial, Vector2 } from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import { TerrainContext } from "../../context/terrain";
import brushShader from "../../shaders/brush";
import { useFrame } from "@react-three/fiber";

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
  const [uniforms, setUniforms] = useState({
    uMouse: { value: new Vector2(0, 0) },
    uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
    uBrushEnabled: { value: false },
  });

  useEffect(() => {
    setUniforms({
      ...uniforms,
      uBrushEnabled: {
        value: isSculptMode,
      },
    });
  }, [isSculptMode]);

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
      setUniforms({
        ...uniforms,
        uMouse: {
          value: new Vector2(mousePosition.point.x, mousePosition.point.z),
        },
      });
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
          baseMaterial={MeshPhysicalMaterial}
          vertexShader={brushShader.vertexShader}
          fragmentShader={brushShader.fragmentShader}
          silent
          uniforms={uniforms}
          color={0x005500}
        />
      </mesh>
    </>
  );
}

export default Terrain;
