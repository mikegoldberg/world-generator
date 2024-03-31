import { useContext, useEffect, useRef, useState } from "react";
import { TerrainContext } from "../../context/terrain";
import {
  CanvasTexture,
  MathUtils,
  PMREMGenerator,
  Vector2,
  Vector3,
} from "three";

function BrushPointer({ spherePosition }: any) {
  const { displacementMap, displacementScale } = useContext(TerrainContext);
  const [displacemntMapRegion, setDisplacementMapRegion] = useState<any>();
  const markerRef = useRef<any>();

  //     const sourceScale = 8 / 1;
  //     const width = displacementMap.width * sourceScale;
  //     const height = displacementMap.height * sourceScale;
  //       const srcX = Math.round(
  //         (displacementMap.width / 8) * (spherePosition[0] + 4 - 0.5)
  //       );
  //       const srcY = Math.round(
  //         (displacementMap.width / 8) * (spherePosition[2] + 4 - 0.5)
  //       );

  useEffect(() => {
    if (!spherePosition || !markerRef.current) {
      return;
    }
    const canvasTexture = new CanvasTexture(displacementMap);
    // canvasTexture.repeat = new Vector2(1, 1);
    // canvasTexture.offset = new Vector2(0.1, 0.1);
    // canvasTexture.matrix;
    markerRef.current.scale(1, 1, 1);
    setDisplacementMapRegion(canvasTexture);
  }, [spherePosition, displacementMap, markerRef.current]);

  return (
    <>
      {displacemntMapRegion && (
        <mesh
          position={spherePosition}
          rotation={[MathUtils.DEG2RAD * -90, 0, 0]}
          castShadow={true}
          receiveShadow={true}
        >
          <planeGeometry args={[8, 8, 64, 64]} ref={markerRef} />
          <meshStandardMaterial
            color={"red"}
            displacementScale={displacementScale}
            displacementMap={displacemntMapRegion}
          />
        </mesh>
      )}
    </>
  );
}

export default BrushPointer;
