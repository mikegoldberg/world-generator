import { useContext, useEffect, useRef } from "react";
import { MathUtils } from "three";
import { TerrainContext } from "../../context/terrain";

function Terrain({ ...props }: any) {
  const { displacementMap, displacementScale } = useContext(TerrainContext);
  const meshRef = useRef<any>();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = MathUtils.DEG2RAD * -90;
    }
  }, [meshRef, displacementMap]);

  return (
    displacementMap && (
      <mesh
        {...props}
        position={[0, displacementScale / -8, 0]}
        castShadow={true}
        receiveShadow={true}
        ref={meshRef}
      >
        <planeGeometry args={[8, 8, 128, 128]} />
        <meshStandardMaterial
          color={"#228822"}
          wireframe={true}
          displacementScale={displacementScale}
          displacementMap={displacementMap}
        />
      </mesh>
    )
  );
}

export default Terrain;
