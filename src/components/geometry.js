module.exports = {
  factory: function() {
    return {
      width: 0,
      radiusTop: 0,
      radiusBottom: 0,
      height: 0,
      depth: 0,
      radiusSegments: 0,
      heightSegments: 0,
      openEnded: 0,
      thetaStart: 0,
      thetaLength: 0
    };
  },
  reset: function(geometry) {
    geometry.width = 0;
    geometry.radiusTop = 0;
    geometry.radiusBottom = 0;
    geometry.height = 0;
    geometry.depth = 0;
    geometry.radiusSegments = 0;
    geometry.heightSegments = 0;
    geometry.openEnded = 0;
    geometry.thetaStart = 0;
    geometry.thetaLength = 0;
  }
};
