import { useContext, useEffect, useRef, useState } from "react";
import {
  DoubleSide,
  MathUtils,
  RawShaderMaterial,
  Vector2,
  Vector3,
} from "three";
import { TerrainContext } from "../../context/terrain";
import BrushPointer from "../brush-pointer";
import { fragmentShader, vertexShader } from "./circle-shader";
import { useFrame } from "@react-three/fiber";
import { HalftoneShader } from "../../shaders/HalftoneShader";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

function Terrain({ ...props }: any) {
  const { displacementMap, displacementScale } = useContext(TerrainContext);
  const [spherePosition, setSpherePosition] = useState<number[] | null>(null);
  // const [material, setMaterial] = useState<any>(null);
  const meshRef = useRef<any>();
  const materialRef = useRef<any>();
  const shaderRef = useRef<any>();
  const planeRef = useRef<any>();
  // const [uniforms, setUniforms] = useState<any>({
  //   center: {
  //     value: new Vector3(0, 0, 0),
  //   },
  //   size: {
  //     value: new Vector2(0.1, 0.1),
  //   },
  //   lineHalfWidth: { value: 0.1 },
  //   u_mouse: { value: new Vector2(0, 0) },
  // });

  const [uniforms, setUniforms] = useState<any>(HalftoneShader.uniforms);

  useEffect(() => {
    if (!materialRef) {
      return;
    }

    // const map = new TextureLoader().load("heightmap.png");
    // materialRef.current.map = map;
    // const clippingPlane = new Plane(new Vector3(0, 0, 0), 0);
    // materialRef.current.clippingPlanes = [clippingPlane];

    // materialRef.current.shader = new ShaderMaterial
  }, [materialRef.current]);

  useEffect(() => {
    if (planeRef.current) {
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

  // useEffect(() => {
  //   if (!meshRef.current) {
  //     return;
  //   }
  //   meshRef.current.material.uniforms.u_mouse.value = uniforms.u_mouse.value;
  // }, [uniforms]);
  // console.log(uniforms.u_mouse.value);
  return (
    <>
      <BrushPointer spherePosition={spherePosition} />
      <mesh
        {...props}
        position={[0, 0, 0]}
        rotation={[MathUtils.DEG2RAD * -90, 0, 0]}
        receiveShadow={true}
        ref={meshRef}
        // onPointerMove={({ point }: any) => {
        //   // setSpherePosition([x, y + 0.1, z]);
        //   setUniforms({
        //     center: {
        //       value: point,
        //     },
        //     size: {
        //       value: new Vector2(1, 1),
        //     },
        //     lineHalfWidth: {
        //       value: 0.1,
        //     },
        //     u_mouse: {
        //       value: new Vector2(
        //         (point.x + 4) / 8,
        //         // point.x / window.innerWidth,
        //         point.y / window.innerHeight
        //       ),
        //       // value: new Vector2(
        //       //   parseFloat(
        //       //     (
        //       //       (window.screen.width - screenX) /
        //       //       window.screen.width
        //       //     ).toFixed(2)
        //       //   ),
        //       //   parseFloat(
        //       //     (
        //       //       (window.screen.height - screenY) /
        //       //       window.screen.height
        //       //     ).toFixed(2)
        //       //   )
        //       // ),
        //     },
        //   });
        // }}
      >
        <planeGeometry args={[8, 8, 64, 64]} ref={planeRef} />
        {/* <boxGeometry args={[3, 3, 3, 12, 12, 12]} /> */}
        {/* <meshStandardMaterial
          color={"#555"}
          wireframe={true}
          side={DoubleSide}
          clipShadows
          clippingPlanes={[new Plane(new Vector3(0, -1, 0))]}
        /> */}
        <shaderMaterial
          // key={uniforms.u_mouse.value.y}
          ref={shaderRef}
          vertexShader={HalftoneShader.vertexShader}
          fragmentShader={HalftoneShader.fragmentShader}
          uniforms={uniforms}
        />
        <meshStandardMaterial
          color={"#004400"}
          ref={materialRef}
          side={DoubleSide}
        />
        <EffectComposer>
          <DepthOfField
            focusDistance={0}
            focalLength={0.02}
            bokehScale={2}
            height={480}
          />
          <Bloom luminanceThreshold={3} luminanceSmoothing={0.9} height={3} />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </mesh>
    </>
  );
}

export default Terrain;
