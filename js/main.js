// THREE Variables
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
const renderer = new THREE.WebGLRenderer();
const light = new THREE.AmbientLight(0xffffff);
const loader = new THREE.GLTFLoader();

// Initial Settings
scene.add(light);
camera.position.z = 5;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xb7c3f3, 1);

document.body.appendChild(renderer.domElement);

// Doll
class Doll {
    constructor() {
        loader.load("../giant-doll/scene.gltf", (gltf) => {
            scene.add(gltf.scene);
            gltf.scene.scale.set(.4, .4, .4);
            gltf.scene.position.set(0, -1, 0);
            this.doll = gltf.scene;
        });
    }

    lookBackward() {
        this.doll.rotation.y = -3.15
    }
    
    lookForward() {
        this.doll.rotation.y = 0
    }
}

// Create the cube
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

 
// Render the scene repeatedly
function renderScene() {
    renderer.render(scene, camera);

    // cube.rotation.x += .01
    // cube.rotation.y += .01
    // cube.rotation.z += .01

    requestAnimationFrame(renderScene);
}
renderScene();

// Responsiveness
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
}

// Init
let doll = new Doll();

setTimeout(() => {
    doll.lookBackward();
    doll.lookForward();
}, 1000);