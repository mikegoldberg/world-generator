import {
  OrthographicCamera,
  GizmoHelper,
  GizmoViewport,
  CameraControls,
} from "@react-three/drei";

function Camera() {
  return (
    <>
      <OrthographicCamera
        zoom={132}
        near={1}
        far={1000}
        position={[33, 33, -84]}
        makeDefault
        castShadow={true}
      >
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["#33cc33", "#aaeeaa", "#55ee55"]}
            labelColor="black"
          />
        </GizmoHelper>
      </OrthographicCamera>
      <CameraControls makeDefault />
    </>
  );
}

export default Camera;
