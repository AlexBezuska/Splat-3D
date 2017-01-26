"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
    var position = game.entities.getComponent(entity, "position");
    if (window.threeObjects) {
      //console.log(entity, window.threeObjects[entity]);

      if (window.threeObjects[entity]) {
        window.threeObjects[entity].position.x = position.x;
        window.threeObjects[entity].position.y = -position.y;
      }
    }

  }, "playerController2d");
};
