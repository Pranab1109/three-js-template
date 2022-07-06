uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;
uniform float uTime;

void main(){
    vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
    vec3 camPos = vec3(0.,0.,2.);
    vec3 ray = normalize(vec3(vUv,-1));
    vec3 color =vec3(vUv,1.);
    gl_FragColor = vec4(color, 1.0);
}