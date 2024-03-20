import { useContext, useEffect, useRef, useState } from "react";
import { MathUtils } from "three";
import { TerrainContext } from "../../context/terrain";
import { useFrame } from "@react-three/fiber";

function Terrain({ ...props }: any) {
  const { displacementMap, displacementScale } = useContext(TerrainContext);
  const [spherePosition, setSpherePosition] = useState(null);
  const sphereRef = useRef<any>();
  const meshRef = useRef<any>();
  const planeRef = useRef<any>();
  // const elapsedTime = 0;

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = MathUtils.DEG2RAD * -90;
    }
  }, [meshRef, displacementMap]);

  useEffect(() => {
    if (planeRef.current) {
      const geometry = planeRef.current;
      const positions = geometry.attributes.position.array;
      let w, h, x, y;
      const width = geometry.parameters.widthSegments + 1;
      const height = geometry.parameters.heightSegments + 1;
      const widthStep = 120 / width;
      const heightStep = 120 / height;

      for (let i = 0; i < positions.length; i += 3) {
        w = (i / 3) % width;
        h = i / 3 / width;

        x = Math.floor(w * widthStep);
        y = Math.floor(h * heightStep);

        const displacement = displacementMap.data[x * 4 + y * 4 * 120];
        positions[i + 2] = (displacement / 255) * displacementScale;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  }, [planeRef.current, displacementScale, displacementMap]);

  useFrame((state, delta) => {
    // state.raycaster.setFromCamera( mouse, camera )
    // const intersection = state.raycaster.intersectObject(meshRef.current);
  });

  return (
    displacementMap && (
      <>
        {spherePosition && (
          <mesh
            {...props}
            position={spherePosition}
            castShadow={true}
            receiveShadow={true}
            ref={meshRef}
            // onPointerDown={console.log}
            // raycast={MouseEvent,}
          >
            {/* <planeBufferGeometry */}
            <sphereGeometry args={[1, 12, 12]} ref={sphereRef} />
            {/* <meshStandardMaterial
            color={"#228822"}
            wireframe={true}
            displacementScale={displacementScale}
            displacementMap={displacementMap}
          /> */}
          </mesh>
        )}
        <mesh
          {...props}
          position={[0, 0, 0]}
          castShadow={true}
          receiveShadow={true}
          ref={meshRef}
          // onPointerDown={({ point }: any) => setSpherePosition(point)}
          // raycast={MouseEvent,}
        >
          <planeGeometry args={[8, 8, 20, 20]} ref={planeRef} />
          <meshStandardMaterial
            color={"#228822"}
            wireframe={true}
            // displacementScale={displacementScale}
            // displacementMap={displacementMap}
          />
        </mesh>
      </>
    )
  );
}

export default Terrain;
