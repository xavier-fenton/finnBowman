import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import WebGL from 'three/addons/capabilities/WebGL.js'

// Need to figure out resizing the canvas properly for now the current state is fine
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer({ alpha: true })

renderer.setSize(window.innerWidth, window.innerHeight)

renderer.setClearColor(0x000000, 0)

const controls = new OrbitControls(camera, renderer.domElement)

function setStyletoCanvas(renderer) {
  renderer.domElement.style.position = 'fixed'
  renderer.domElement.style.top = '0px'
  renderer.domElement.style.paddingLeft = '20px'
  renderer.domElement.style.paddingRight = '20px'
  renderer.domElement.style.cursor = 'grab'
  renderer.domElement.id = 'three'

  document.body.appendChild(renderer.domElement)
}

setStyletoCanvas(renderer)

const light = new THREE.PointLight(0xffffff, 2, 20, 2)
light.position.set(1, 1, 1)

light.position.x = -2
scene.add(light)

const light2 = new THREE.PointLight(0xffffff, 2, 20, 2)
light2.position.set(1, 1, 1)

light2.position.x = 2
scene.add(light2)

const light3 = new THREE.PointLight(0xffffff, 2, 20, 2)
light3.position.set(1, 1, 1)

light3.position.x = 1
scene.add(light3)

const light4 = new THREE.PointLight(0xffffff, 2, 20, 2)
light4.position.set(1, 1, 1)

light4.position.x = -1
scene.add(light4)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
scene.add(directionalLight)

const loader = new GLTFLoader()

loader.load(
  '/finnbowman_1.glb',
  function (obj) {
    if (!obj) {
      return new Error('no obj found')
    }

    obj.scene.children[0].material.roughness = 1
    fitCameraToCenteredObject(camera, obj.scene, scene.offset, controls)

    scene.add(obj.scene)
  },
  undefined,
  function (error) {
    console.error(error)
  }
)

const fitCameraToCenteredObject = function (
  camera,
  object,
  offset,
  orbitControls
) {
  const boundingBox = new THREE.Box3()
  boundingBox.setFromObject(object)

  let middle = new THREE.Vector3()
  let size = new THREE.Vector3()
  boundingBox.getSize(size)

  // figure out how to fit the box in the view:
  // 1. figure out horizontal FOV (on non-1.0 aspects)
  // 2. figure out distance from the object in X and Y planes
  // 3. select the max distance (to fit both sides in)
  //
  // The reason is as follows:
  //
  // Imagine a bounding box (BB) is centered at (0,0,0).
  // Camera has vertical FOV (camera.fov) and horizontal FOV
  // (camera.fov scaled by aspect, see fovh below)
  //
  // Therefore if you want to put the entire object into the field of view,
  // you have to compute the distance as: z/2 (half of Z size of the BB
  // protruding towards us) plus for both X and Y size of BB you have to
  // figure out the distance created by the appropriate FOV.
  //
  // The FOV is always a triangle:
  //
  //  (size/2)
  // +--------+
  // |       /
  // |      /
  // |     /
  // | F° /
  // |   /
  // |  /
  // | /
  // |/
  //
  // F° is half of respective FOV, so to compute the distance (the length
  // of the straight line) one has to: `size/2 / Math.tan(F)`.
  //
  // FTR, from https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
  // the camera.fov is the vertical FOV.

  const fov = camera.fov * (Math.PI / 180)
  const fovh = 2 * Math.atan(Math.tan(fov / 2) * camera.aspect)
  let dx = size.z / 2 + Math.abs(size.x / 2 / Math.tan(fovh / 2))
  let dy = size.z / 2 + Math.abs(size.y / 2 / Math.tan(fov / 2))
  let cameraZ = Math.max(dx, dy)

  // offset the camera, if desired (to avoid filling the whole canvas)
  if (offset !== undefined && offset !== 0) cameraZ *= offset

  camera.position.set(0, 0, cameraZ)

  // set the far plane of the camera so that it easily encompasses the whole object
  const minZ = boundingBox.min.z
  const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ

  camera.far = cameraToFarEdge * 3
  camera.updateProjectionMatrix()

  if (orbitControls !== undefined) {
    // set camera to rotate around the center
    orbitControls.target = new THREE.Vector3(0, 0, 0)

    // prevent camera from zooming out far enough to create far plane cutoff
    orbitControls.maxDistance = cameraToFarEdge * 2
  }
}
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  requestAnimationFrame(animate)

  rotateModel(scene)
  renderer.render(scene, camera)
}

function rotateModel(model) {
  setTimeout(() => {
    model.rotation.y += 0.009
  }, 2500)
}

if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  console.log('ThreeJS is compatiable with this device: ', navigator.userAgent)
  animate()
} else {
  !animate()
}
