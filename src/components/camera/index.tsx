import {
  OrthographicCamera,
  GizmoHelper,
  GizmoViewport,
} from "@react-three/drei";

function Camera() {
  return (
    <OrthographicCamera
      zoom={132}
      near={1}
      far={1000}
      position={[33, 33, -84]}
      makeDefault
      castShadow={true}
    >
      <GizmoHelper alignment="bottom-right" margin={[70, 70]}>
        <GizmoViewport />
      </GizmoHelper>
    </OrthographicCamera>
  );
}

export default Camera;
