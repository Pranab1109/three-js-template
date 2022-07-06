import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import waterVertexShader from './shaders/vertex.glsl'
import waterFragmentShader from './shaders/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 })
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Water
 */
// Geometry
const planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 1024,1024)

// Material
const planeMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms:
    {
        uTime: { value: 0 },
        uv : {value : null}
    }
})

// Mesh
const plane = new THREE.Mesh(planeGeometry, planeMaterial)

scene.add(plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    if(sizes.height/sizes.width > imageAspect){
        a1 = sizes.height / sizes.width * imageAspect
    }else{
        a2 = sizes.height / sizes.width * imageAspect
    }
    planeMaterial.uniforms.resolution.value.x = sizes.width
    planeMaterial.uniforms.resolution.value.y = sizes.height
    planeMaterial.uniforms.resolution.value.z = a1
    planeMaterial.uniforms.resolution.value.w = a2
})

planeMaterial.uniforms.resolution.value.x = sizes.width
planeMaterial.uniforms.resolution.value.y = sizes.height
planeMaterial.uniforms.resolution.value.z = a1
planeMaterial.uniforms.resolution.value.w = a2


/**
 * Camera
 */

//  const frustumSize = 1;
//  const aspect = sizes.width / sizes.height;
//  const camera = new THREE.OrthographicCamera(
//      frustumSize * aspect / -2,
//      frustumSize * aspect / 2,
//      frustumSize / 2,
//      frustumSize / -2,
//      -1000,
//      1000
//  )

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0,0,3)
camera.lookAt(plane)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Water
    planeMaterial.uniforms.uTime.value = elapsedTime

    // Render
    renderer.render(scene, camera)

    //update controls
    controls.update()

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()