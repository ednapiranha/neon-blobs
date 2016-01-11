// Borrowed and mangled from http://threejs.org/examples/#canvas_camera_orthographic

(function () {
  var height = window.innerHeight;
  var width = window.innerWidth;

  var container;
  var camera, scene, renderer;

  init();
  animate();

  function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1100);
    scene = new THREE.Scene();

    scene.fog = new THREE.FogExp2('#fff', 0.001);

    // grids

    var size = 500, step = 15;
    var geometry = new THREE.Geometry();

    for (var i =- size; i <= size; i += step) {
      geometry.vertices.push( new THREE.Vector3(i, -size, i));
      geometry.vertices.push( new THREE.Vector3(-i, size, i));
    }

    var material = new THREE.LineBasicMaterial({
      color: '#ff0054',
      opacity: 0.9
    });

    var line = new THREE.LineSegments(geometry, material);
    scene.add(line);

    var geometry = new THREE.OctahedronGeometry(700, 1);
    var geometry = new THREE.OctahedronGeometry(500, 2);
    var material = new THREE.MeshLambertMaterial({
      color: '#005ff1',
      transparent: true,
      opacity: 0.5
    });

    var material2 = new THREE.MeshLambertMaterial({
      color: '#ff00f7',
      transparent: true,
      opacity: 0.35
    });

    for (var i = 0; i < 15; i ++) {
      var cube2 = new THREE.Mesh(geometry, material);

      cube2.position.x = Math.sin(i * 2) * Math.floor(Math.random() * 700 - 10) + 10;
      cube2.position.y = Math.tan(i) * Math.floor(Math.random() * 900 - 10) + 10;
      cube2.position.z = 500 * Math.cos(i);

      scene.add(cube2);
    }

    for (var i = 0; i < 25; i ++) {
      var cube2 = new THREE.Mesh(geometry, material2);

      cube2.position.x = Math.cos(i) * Math.floor(Math.random() * 900 - 10) + 100;
      cube2.position.y = Math.tan(i) * Math.floor(Math.random() * 700 - 10) + 10;
      cube2.position.z = 700 * Math.cos(i);

      scene.add(cube2);
    }

    // Lighting

    var light = new THREE.AmbientLight('#fff');
    scene.add(light);

    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });

    renderer.setClearColor('#fff', 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
  }

  function onWindowResize() {
    camera.left = window.innerWidth / -2;
    camera.right = window.innerWidth / 2;
    camera.top = window.innerHeight / 2;
    camera.bottom = window.innerHeight / - 2;

    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {

    var timer = Date.now() * 0.0006;
    camera.position.x = Math.sin(timer) * 150;
    camera.position.x = Math.sin(timer) * 100;
    camera.position.z = Math.cos(timer) * 500;

    renderer.render(scene, camera);
  }
})();
