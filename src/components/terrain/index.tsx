import { useEffect, useRef, useState } from "react";
import { CanvasTexture, MathUtils, MeshPhysicalMaterial, Vector2 } from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import groundShader from "../../shaders/ground";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import store from "../../store";

function Terrain() {
  const {
    displacementMap,
    displacementScale,
    modificationLayer,
    isSculptMode,
    isTexturePaintMode,
    mousePosition,
    showWireframe,
    terrainAlbedo,
    activeBrushFade,
    activeBrushSize,
  } = store();
  const planeRef = useRef<any>();
  const shaderRef = useRef<any>();
  const [uniforms, setUniforms] = useState<any>({
    uMouse: { value: new Vector2(0, 0) },
    uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
    uBrushEnabled: { value: false },
    uGrassAlbedo: { value: null },
    uBrushSize: { value: 80 },
    uBrushFade: { value: 0.5 },
  });

  useEffect(() => {
    setUniforms({
      ...uniforms,
      uBrushEnabled: {
        value: isSculptMode || isTexturePaintMode,
      },
    });
  }, [isSculptMode, isTexturePaintMode]);

  useEffect(() => {
    setUniforms({
      ...uniforms,
      uBrushFade: {
        value: activeBrushFade,
      },
    });
  }, [activeBrushFade]);

  useEffect(() => {
    setUniforms({
      ...uniforms,
      uBrushSize: {
        value: activeBrushSize,
      },
    });
  }, [activeBrushSize]);

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
    store.setState({
      isSculpting: false,
      isTexturePainting: false,
    });
  }

  function handlePointerDown() {
    store.setState({
      isSculpting: isSculptMode,
      isTexturePainting: isTexturePaintMode,
    });
  }

  function hanldePointerMove(mousePosition: ThreeEvent<PointerEvent>) {
    if (isSculptMode || isTexturePaintMode) {
      store.setState({ mousePosition });
    }
  }

  return (
    <>
      {/* <mesh
        position={[0, displacementScale / 2, 0]}
        rotation={[MathUtils.DEG2RAD * -90, 0, 0]}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={hanldePointerMove}
        visible={false}
      >
        <planeGeometry args={[8, 8, 64, 64]} />
      </mesh> */}
      <mesh
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={hanldePointerMove}
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
          map={terrainAlbedo ? new CanvasTexture(terrainAlbedo) : undefined}
          silent
          uniforms={uniforms}
          wireframe={showWireframe}
        />
      </mesh>
    </>
  );
}

export default Terrain;
