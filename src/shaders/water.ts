const vertexShader = `
varying vec2 vPosition;

void main() {
    vPosition = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;

varying vec2 vPosition;

void main() {
    csm_DiffuseColor = vec4(0, 0.6, 0.7, 5.8);
}
`;

export default { vertexShader, fragmentShader };
