const vertexShader = `
varying vec2 vPosition;

void main() {
    vPosition = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform bool uBrushEnabled;

varying vec2 vPosition;

void main() {
    vec2 uv = uMouse.xy / uResolution.xy;
    float x =  uMouse.x  - vPosition.x;
    float y =  uMouse.y - vPosition.y * -1.0;
    vec3 baseColor = vec3(0, 1.0, 0);
    float dist = sqrt(x * x + y * y);
    
    if (dist < 1.0 && uBrushEnabled) {
        if (dist > .9) {
            csm_Emissive = vec3(.2, .2, .2);
        } else {
            csm_Emissive = vec3(.05, .05, .05);
        }
    }

    csm_DiffuseColor = vec4(baseColor ,1.0);
}
`;

export default { vertexShader, fragmentShader };
