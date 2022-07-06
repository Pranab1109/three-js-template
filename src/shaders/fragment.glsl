varying vec2 vUv;

void main()
{
    vec3 color =vec3(vUv,1.);
    gl_FragColor = vec4(color, 1.0);
}