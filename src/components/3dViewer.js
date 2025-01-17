async function render() {
  console.log("render runnning");
  // Set up the scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 40); // Adjust camera position for a good initial view

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
  canvasContainer.value.appendChild(renderer.domElement);

  // Add ambient light
  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7.5);
  directionalLight.castShadow = true; // Enable shadows
  scene.add(directionalLight);
  // Add OrbitControls for interactivity
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Smooths the interaction
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 20; // Minimum zoom distance
  controls.maxDistance = 50; // Maximum zoom distance
  controls.maxTargetRadius = 40;
  controls.target.set(0, 1, 0); // Center the controls on the model

  // Load the 3D model
  const loader = new GLTFLoader();
  loader.load(
    `${activity.value.file}`,
    (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      // Animate the scene
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update(); // Update the controls each frame
        renderer.render(scene, camera);
      };
      animate();
    },
    undefined,
    (error) => {
      console.error("An error occurred while loading the model:", error);
    }
  );

  // Resize handler
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}
