import {
  CanvasTexture,
  MathUtils,
  MeshPhysicalMaterial,
  ShaderMaterial,
} from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import waterShader from "../../shaders/water_2";
import store from "../../store";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useConst } from "@chakra-ui/react";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

function Water() {
  // const { displacementMap } = store();
  const materialRef = useRef<any>();
  const superman = useConst({
    origin: new THREE.Vector3(0, 1.5, 2),
    speed: 10.0,
    roll: 0, //Math.PI,
    heading: 0,
    pitch: Math.PI,
  });
  const uniforms = useConst<any>({
    iTime: { value: 0 },
    iResolution: {
      value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1),
    },
    origin: { value: superman.origin },
    roll: { value: superman.roll },
    yaw: { value: superman.heading },
    pitch: { value: superman.pitch },
    amplitude: { value: 0.8 },
    frequency: { value: 0.24 },
    choppy: { value: 3.0 },
    night: { value: false },
  });

  // useEffect(() => {
  //   if (displacementMap && materialRef.current) {
  //     materialRef.current.uniforms.uNoiseTexture.value = new CanvasTexture(
  //       displacementMap
  //     );
  //   }
  // }, [displacementMap]);

  useFrame(({ clock: { elapsedTime } }) => {
    materialRef.current.uniforms.iTime.value = elapsedTime;
  });

  return (
    <mesh
      position={[0, 0, 0]}
      rotation={[MathUtils.DEG2RAD * -90, 0, -MathUtils.DEG2RAD * -180]}
      receiveShadow={true}
    >
      <planeGeometry args={[4, 4, 100, 100]} />
      <CustomShaderMaterial
        baseMaterial={MeshPhysicalMaterial}
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={waterShader.vertexShader}
        fragmentShader={waterShader.fragmentShader}
      />
    </mesh>
  );
}

export default Water;
