const vertexShader = `
varying vec2 vUv;
varying vec2 vPosition;

void main() {
    vUv = uv * 2.0;
    vPosition = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform bool uBrushEnabled;
uniform float uBrushSize;
uniform float uBrushFade;
uniform sampler2D uGrassAlbedo;

varying vec2 vUv;
varying vec2 vPosition;

void main() {
    // vec2 uv = uMouse.xy / uResolution.xy;
    float x =  uMouse.x  - vPosition.x;
    float y =  uMouse.y - vPosition.y * -1.0;
    vec3 baseColor = vec3(0, 1.0, 0);
    float dist = sqrt(x * x + y * y);
    
    if (dist < 1.0 && uBrushEnabled) {
        if (dist > .9) {
            csm_Emissive = vec3(.2, .2, .2);
        } 
        
        if (dist < .9 && dist < uBrushFade)
            csm_Emissive = vec3(.05, .05, .05);
        }
    }

    // csm_DiffuseColor = texture2D(uGrassAlbedo, vUv * 12.0);
}
`;

export default { vertexShader, fragmentShader };
