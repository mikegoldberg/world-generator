import { useContext, useEffect, useRef, useState } from "react";
import {
  CanvasTexture,
  DoubleSide,
  MathUtils,
  MeshDepthMaterial,
  MeshPhysicalMaterial,
  RGBADepthPacking,
  Vector2,
} from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import { TerrainContext } from "../../context/terrain";
import circleShader from "./circle-shader";
import { useFrame } from "@react-three/fiber";

function Terrain({ ...props }: any) {
  const { displacementMap, displacementScale } = useContext(TerrainContext);
  const planeRef = useRef<any>();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [uniforms, setUniforms] = useState({
    u_mouse: { value: new Vector2(4, 0) },
    u_resolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
    u_time: { value: 0.0 },
  });

  useEffect(() => {
    if (planeRef.current) {
      // return;
      const geometry = planeRef.current;
      const positions = geometry.attributes.position.array;
      let w, h, x, y;
      const width = geometry.parameters.widthSegments + 1;
      const height = geometry.parameters.heightSegments + 1;
      const widthStep = displacementMap.width / width;
      const heightStep = displacementMap.height / height;

      for (let i = 0; i < positions.length; i += 3) {
        w = (i / 3) % width;
        h = i / 3 / width;

        x = Math.floor(w * widthStep);
        y = Math.floor(h * heightStep);

        const displacement =
          displacementMap.data[x * 4 + y * 4 * displacementMap.width];
        positions[i + 2] = (displacement / 255) * displacementScale;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  }, [planeRef.current, displacementScale, displacementMap]);

  useFrame(({ clock: { elapsedTime } }) => {
    setUniforms({
      ...uniforms,
      u_mouse: { value: new Vector2(mousePosition.x, mousePosition.y) },
      u_time: { value: elapsedTime },
    });
  });

  return (
    <mesh
      {...props}
      position={[0, 0, 0]}
      rotation={[MathUtils.DEG2RAD * -90, 0, 0]}
      receiveShadow={true}
      onPointerMove={setMousePosition}
      // customDepthMaterial={
      //   new MeshDepthMaterial({
      //     depthPacking: RGBADepthPacking,
      //     alphaTest: 0.5,
      //   })
      // }
      // customDistanceMaterial={}
    >
      <planeGeometry args={[8, 8, 64, 64]} ref={planeRef} />
      {/* <shaderMaterial
        key={uniforms.u_mouse.value.x}
        uniforms={uniforms}
        vertexShader={circleShader.vertexShader}
        fragmentShader={circleShader.fragmentShader}
      /> */}
      {/* <meshStandardMaterial
        color={"#004400"}
        side={DoubleSide}
        onBeforeCompile={(shader) => {
          shader.uniforms = {
            ...shader.uniforms,
            ...uniforms,
            time: { value: 0 },
          };

          shader.vertexShader = circleShader.vertexShader;
          shader.fragmentShader = circleShader.fragmentShader;
        }}
      /> */}
      <CustomShaderMaterial
        // ref={materialRef}
        key={uniforms.u_mouse.value.x}
        baseMaterial={MeshPhysicalMaterial}
        vertexShader={circleShader.vertexShader}
        fragmentShader={circleShader.fragmentShader}
        /*silent parameter to true disables the default warning if needed*/
        silent
        uniforms={uniforms}
        // flatShading
        color={0x005500}
        // displacementMap={new CanvasTexture(displacementMap)}
        // ...
      />
    </mesh>
  );
}

export default Terrain;
