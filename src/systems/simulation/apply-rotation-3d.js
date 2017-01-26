"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
    var rotation3d = game.entities.getComponent(entity, "rotation3d");


    // if(!window.threeObjects[entity].rotation){
    //window.threeObjects[entity].rotation = { x: 0, y: 0, z: 0 };

    var thisRotation = window.threeObjects[entity].rotation;
    if (rotation3d.x) {
      // window.threeObjects[entity].rotation.x = 0;
      thisRotation.x += rotation3d.x;
    }
    if (rotation3d.y) {
      // window.threeObjects[entity].rotation.y = 0;
      thisRotation.y += rotation3d.y;
    }
    if (rotation3d.z) {
      // window.threeObjects[entity].rotation.z = 0;
      thisRotation.z += rotation3d.z;
    }

  }, "rotation3d");
};
