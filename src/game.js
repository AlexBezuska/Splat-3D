"use strict";

var THREE = require("three");
var container = document.getElementById("three");

window.threeObjects = {};

var scene = new THREE.Scene();



var renderer = new THREE.WebGLRenderer();

var WIDTH = 1137;
var HEIGHT = 640;
var VIEW_ANGLE = 45;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 0.1;
var FAR = 10000;

var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
renderer.setSize(WIDTH, HEIGHT);

container.appendChild(renderer.domElement);





var canvas = document.getElementById("canvas");
var Splat = require("splat-ecs");
require("./index.html");


// This is some webpack magic to ensure the dynamically required scripts are loaded

var splatSystemPath = "splat-ecs/lib/systems";
// WARNING: can't use splatSystemPath variable here, or webpack won't pick it up
var splatSystemRequire = require.context("splat-ecs/lib/systems", true, /\.js$/);

var localSystemPath = "./systems";
var localSystemRequire = require.context("./systems", true, /\.js$/);

var localScriptPath = "./scripts";
var localScriptRequire = require.context("./scripts", true, /\.js$/);

function generateManifest(files, folder) {
  return files.reduce(function(manifest, file) {
    var basename = file.substr(2);
    manifest[basename] = folder + "/" + basename;
    return manifest;
  }, {});
}

require.context("./fonts", true, /.*\.(eot|svg|ttf|woff2?)$/i);

var imageContext = require.context("./images", true, /\.(jpe?g|png|gif|svg)$/i);
var imageManifest = generateManifest(imageContext.keys(), "images");

var soundContext = require.context("./sounds", true, /\.(mp3|ogg|wav)$/i);
var soundManifest = generateManifest(soundContext.keys(), "sounds");

var localDataPath = "./data";
var localDataRequire = require.context("./data", true, /\.json$/);

var componentContext = require.context("./components", true, /\.js(on)?$/);
var componentManifest = generateComponentManifest(componentContext);

function generateComponentManifest(context) {
  var files = context.keys();
  return files.reduce(function(manifest, file) {
    var name = snakeToCamelCase(basename(file).substr(2));
    manifest[name] = context(file);
    return manifest;
  }, {});
}

function snakeToCamelCase(str) {
  return str.replace(/-([a-z0-9])/g, function(g) { return g[1].toUpperCase(); });
}

function basename(path) {
  var pos = path.lastIndexOf(".");
  if (pos !== -1) {
    return path.substring(0, pos);
  }
  return path;
}

function customRequire(path) {
  if (path.indexOf(splatSystemPath) === 0) {
    var splatName = "./" + path.substr(splatSystemPath.length + 1) + ".js";
    return splatSystemRequire(splatName);
  }
  if (path.indexOf(localSystemPath) === 0) {
    var localName = "./" + path.substr(localSystemPath.length + 1) + ".js";
    return localSystemRequire(localName);
  }
  if (path.indexOf(localScriptPath) === 0) {
    var scriptName = "./" + path.substr(localScriptPath.length + 1) + ".js";
    return localScriptRequire(scriptName);
  }
  if (path === "./data/components") {
    return componentManifest;
  }
  if (path === "./data/images") {
    return imageManifest;
  }
  if (path === "./data/sounds") {
    return soundManifest;
  }
  if (path.indexOf(localDataPath) === 0) {
    var dataName = "./" + path.substr(localDataPath.length + 1) + ".json";
    return localDataRequire(dataName);
  }
  console.error("Unable to load module: \"", path, "\"");
  return undefined;
}
window.game = new Splat.Game(canvas, customRequire);
window.game.start();


setTimeout(function() {
  var entities = window.game.scenes.main.data.entities.entities;
  console.log(entities);

  Object.keys(entities).forEach(function(key) {
    var entity = entities[key];
    //console.log(entities[key].id);
    if (entity.model) {
      createModel[entity.model.type](
        entities[key].id,
        entity.position,
        entity.geometry,
        entity.material
      );
    }
  });

},1000);

var pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.x = 200;
pointLight.position.y = 200;
pointLight.position.z = 200;
scene.add(pointLight);


camera.position.z = 250;

var render = function() {
  requestAnimationFrame(render);
  //console.log(window.threeObjects);
  renderer.render(scene, camera);
};

render();


var createModel = {
  /*
  cylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength)
  radiusTop — Radius of the cylinder at the top. Default is 20.
  radiusBottom — Radius of the cylinder at the bottom. Default is 20.
  height — Height of the cylinder. Default is 100.
  radiusSegments — Number of segmented faces around the circumference of the cylinder. Default is 8
  heightSegments — Number of rows of faces along the height of the cylinder. Default is 1.
  openEnded — A Boolean indicating whether the ends of the cylinder are open or capped. Default is false, meaning capped.
  thetaStart — Start angle for first segment, default = 0 (three o'clock position).
  thetaLength — The central angle, often called theta, of the circular sector. The default is 2*Pi, which makes for a complete cylinder.
  */
  sphere: function(id, position, geometry, material) {
    var thisGeometry = new THREE.SphereGeometry(
      geometry.radiusTop,
      geometry.radiusBottom,
      geometry.height,
      geometry.radiusSegments//,
      // geometry.heightSegments,
      // geometry.openEnded,
      // geometry.thetaStart,
      // geometry.thetaLength
    );
    this.setupMesh(id, position, thisGeometry, material);
  },

  /*
  cylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength)
  radiusTop — Radius of the cylinder at the top. Default is 20.
  radiusBottom — Radius of the cylinder at the bottom. Default is 20.
  height — Height of the cylinder. Default is 100.
  radiusSegments — Number of segmented faces around the circumference of the cylinder. Default is 8
  heightSegments — Number of rows of faces along the height of the cylinder. Default is 1.
  openEnded — A Boolean indicating whether the ends of the cylinder are open or capped. Default is false, meaning capped.
  thetaStart — Start angle for first segment, default = 0 (three o'clock position).
  thetaLength — The central angle, often called theta, of the circular sector. The default is 2*Pi, which makes for a complete cylinder.
  */
  cylinder: function(id, position, geometry, material) {
    var thisGeometry = new THREE.CylinderGeometry(
      geometry.radiusTop,
      geometry.radiusBottom,
      geometry.height,
      geometry.radiusSegments//,
      // geometry.heightSegments,
      // geometry.openEnded,
      // geometry.thetaStart,
      // geometry.thetaLength
    );
    this.setupMesh(id, position, thisGeometry, material);
  },

  /*
  BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
  width — Width of the sides on the X axis.
  height — Height of the sides on the Y axis.
  depth — Depth of the sides on the Z axis.
  widthSegments — Optional. Number of segmented faces along the width of the sides. Default is 1.
  heightSegments — Optional. Number of segmented faces along the height of the sides. Default is 1.
  depthSegments — Optional. Number of segmented faces along the depth of the sides. Default is 1.
  */
  box: function(id, position, geometry, material) {
    var thisGeometry = new THREE.CubeGeometry(
      geometry.width,
      // geometry.radiusBottom,
      geometry.height,
      geometry.depth
      // geometry.radiusSegments,
      // geometry.heightSegments,
      // geometry.openEnded,
      // geometry.thetaStart,
      // geometry.thetaLength
    );
    this.setupMesh(id, position, thisGeometry, material);
  },

  setupMesh: function(id, position, geometry, material) {
    if (material.type === "basic") {
      var thisMaterial = new THREE.MeshBasicMaterial({ color: material.color });
    }
    var mesh = new THREE.Mesh(geometry, thisMaterial);
    mesh.position.x = position.x;
    mesh.position.y = position.y;
    mesh.position.z = position.z;
    window.threeObjects[id] = mesh;
    scene.add(window.threeObjects[id]);
  }

};
