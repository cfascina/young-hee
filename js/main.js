// THREE Variables
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
const renderer = new THREE.WebGLRenderer();
const light = new THREE.AmbientLight(0xffffff);
const loader = new THREE.GLTFLoader();

// Global Variables
const positionStart = -3
const postionEnd = 3
const trackWidth = positionStart * -2 + .2

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
        gsap.to(this.doll.rotation, {y: -3.15, duration: .45});
    }
    
    lookForward() {
        gsap.to(this.doll.rotation, {y: 0, duration: .45});
    }
}

// Player
class Player {
    constructor() {
        let geometry = new THREE.SphereGeometry(.3, 32, 16);
        let material = new THREE.MeshBasicMaterial({color: 0xffffff});
        let sphere = new THREE.Mesh(geometry, material);

        this.player = sphere;
        this.playerInfo = {
            positionX: positionStart,
            velocity: 0
        }

        sphere.position.x = positionStart;
        sphere.position.z = 1;
        scene.add(sphere);
    }

    move() {
        this.playerInfo.velocity = .03
    }

    updatePosition() {
        this.playerInfo.positionX += this.playerInfo.velocity;
        this.player.position.x = this.playerInfo.positionX;
    }
}

// Create cube
function createCube(size, positionX, rotationY = 0, colorCode = 0xfbc851) {
    let geometry = new THREE.BoxGeometry(size.width, size.height, size.depth);
    let material = new THREE.MeshBasicMaterial({color: colorCode});
    let cube = new THREE.Mesh(geometry, material);

    cube.position.x = positionX;
    cube.rotation.y = rotationY;
    scene.add(cube);

    return cube;
}
 
// Create Track
function createTrack() {
    createCube({width: trackWidth, height: 1.5, depth: 1}, 0, 0, 0xe5a716).position.z = -1;
    createCube({width: .2, height: 1.5, depth: 1}, positionStart, .35);
    createCube({width: .2, height: 1.5, depth: 1}, postionEnd, -.35);
}

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
    // doll.lookForward();
}, 1000);

const player = new Player();

createTrack();

// Render the scene repeatedly
function renderScene() {
    renderer.render(scene, camera);
    requestAnimationFrame(renderScene);
    player.updatePosition();
}
renderScene();
