module.exports = {
  factory: function() {
    return {
      x: 0,
      y: 0,
      z: 0
    };
  },
  reset: function(rotation3d) {
    rotation3d.x = 0;
    rotation3d.y = 0;
    rotation3d.z = 0;
  }
};
