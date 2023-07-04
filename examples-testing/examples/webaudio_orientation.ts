import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { PositionalAudioHelper } from "three/addons/helpers/PositionalAudioHelper.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let scene, camera, renderer;

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", init);

function init() {
  const overlay = document.getElementById("overlay");
  overlay.remove();

  const container = document.getElementById("container");

  //

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(3, 2, 3);

  const reflectionCube = new THREE.CubeTextureLoader()
    .setPath("textures/cube/SwedishRoyalCastle/")
    .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa0a0a0);
  scene.fog = new THREE.Fog(0xa0a0a0, 2, 20);

  //

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(5, 5, 0);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 1;
  dirLight.shadow.camera.bottom = -1;
  dirLight.shadow.camera.left = -1;
  dirLight.shadow.camera.right = 1;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 20;
  scene.add(dirLight);

  // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

  //

  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);

  const grid = new THREE.GridHelper(50, 50, 0xc1c1c1, 0xc1c1c1);
  scene.add(grid);

  //

  const listener = new THREE.AudioListener();
  camera.add(listener);

  const audioElement = document.getElementById("music");
  audioElement.play();

  const positionalAudio = new THREE.PositionalAudio(listener);
  positionalAudio.setMediaElementSource(audioElement);
  positionalAudio.setRefDistance(1);
  positionalAudio.setDirectionalCone(180, 230, 0.1);

  const helper = new PositionalAudioHelper(positionalAudio, 0.1);
  positionalAudio.add(helper);

  //

  const gltfLoader = new GLTFLoader();
  gltfLoader.load("models/gltf/BoomBox.glb", function (gltf) {
    const boomBox = gltf.scene;
    boomBox.position.set(0, 0.2, 0);
    boomBox.scale.set(20, 20, 20);

    boomBox.traverse(function (object) {
      if (object.isMesh) {
        object.material.envMap = reflectionCube;
        object.geometry.rotateY(-Math.PI);
        object.castShadow = true;
      }
    });

    boomBox.add(positionalAudio);
    scene.add(boomBox);
    animate();
  });

  // sound is damped behind this wall

  const wallGeometry = new THREE.BoxGeometry(2, 1, 0.1);
  const wallMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0.5,
  });

  const wall = new THREE.Mesh(wallGeometry, wallMaterial);
  wall.position.set(0, 0.5, -0.5);
  scene.add(wall);

  //

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  //

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.1, 0);
  controls.update();
  controls.minDistance = 0.5;
  controls.maxDistance = 10;
  controls.maxPolarAngle = 0.5 * Math.PI;

  //

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
