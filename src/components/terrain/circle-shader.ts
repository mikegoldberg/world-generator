// export const vertexShader = `
// varying vec2 vPos;
// varying vec2 vPosition;

// import { Vector2 } from "three";

// void main() {
//     vPos = vec2(.6, .1);
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }
// `;

// export const fragmentShader = `
// uniform vec3 center;
// uniform vec2 size;
// uniform float lineHalfWidth;
// uniform vec2 u_mouse;

// varying vec2 vPos;
// varying vec2 vPosition;

// void main() {
//     vec2 Ro = size * .5;
//     vec2 Uo = abs( u_mouse.xy - center.xz ) - Ro;
//     vec3 color = mix(vec3(1.), vec3(1., 0., 0.), float(abs(max(Uo.x, Uo.y)) < lineHalfWidth));

//     gl_FragColor = vec4(vec3( vPosition.x + 4.0 / 8.0, 0, 0), 1.  );
// }
// `;

const vertexShader = `
varying vec2 vPosition;

void main() {
    vPosition = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    // gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;

varying vec2 vPosition;

void main() {
    vec2 uv = u_mouse.xy / u_resolution.xy;
    
    float x =  u_mouse.x  - vPosition.x; // uv.x - vPosition.x;
    float y =  u_mouse.y - vPosition.y * -1.0; // uv.y - vPosition.y;
    
    vec3 col = vec3(0, 1.0, 0);
    
    float dist = sqrt(x * x + y * y);
    
    if (dist < 1.0 && dist > .9) {
        col = 0.5 + 0.5*cos(u_time+uv.xyx+vec3(0,2,4));
        gl_FragColor = vec4(col, 1.0);
        // csm_Emissive = vec3(.15, .15, .15);
        return;
    }

    // Output to screen
    csm_DiffuseColor = vec4(col ,1.0);
    // csm_DiffuseColor = vec4(0.2, 0.5, 0.8, 1.0);
}
`;

export default { vertexShader, fragmentShader };
