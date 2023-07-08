import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

//scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
camera.position.y = 4
camera.position.z = 10

//renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.antialias = true

//mesh
const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({color:0xff0000})
const material = new THREE.MeshStandardMaterial()
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
cube.castShadow = true

//ground
const groundGeometry = new THREE.PlaneGeometry(10, 10)
const groundMaterial = new THREE.MeshStandardMaterial({side: THREE.DoubleSide})
const ground = new THREE.Mesh(groundGeometry, groundMaterial)
ground.rotation.x = -Math.PI *0.5
ground.position.y = -2
scene.add(ground)
ground.receiveShadow = true

//lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.15)
const pointLight = new THREE.PointLight(0xffffff, 0.35)
scene.add(ambientLight, pointLight)
pointLight.position.y = 5
pointLight.castShadow = true
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024

//controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

//handle resize
window.addEventListener('resize', () =>
{
    console.log('resizing...')
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//animation loop
function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)

    //update controls
    controls.update()

    //rotate cube
    cube.rotation.x += 0.01
    cube.rotation.z += 0.01
}

animate()