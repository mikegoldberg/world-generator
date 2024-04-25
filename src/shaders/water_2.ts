import fBM from "./noise/fBM";

const vertexShader = `
${fBM}

uniform float iTime;

varying vec3 vPosition;

void main() {
    vPosition = position;
    vec3 color = vec3(0.0);
    vec2 st =  vPosition.xy;
    color += fbm(st * 2.0);
    // vPosition.z = (sin(iTime * 33.0 * position.x) * 100.0) / 1000.0 + 1.0;
        // mod(color.y * 155.0, 105.0) * mod(position.y, 10.0) * .002 * sin(iTime); 
        // cos(iTime + mod(color.x, 12.0));
    csm_Position = vPosition;
}
`;

const fragmentShader = `
${fBM}

uniform vec2 iResolution;
uniform float iTime;

varying vec3 vPosition;

void main() {
    vec2 st =  vPosition.xy;
    vec3 color = vec3(0.0);
    color += fbm(st * 2.0);
    color.r = 0.0;
    color.g = 0.0;
    color.b = mix(sin(iTime) / 5.0 + color.b + .1, 1.0);
    csm_DiffuseColor = vec4(color, 1.0);
}
`;

export default { vertexShader, fragmentShader };
