module.exports = {
  factory: function() {
    return {
      type: "basic",
      color: "rgba(255,255,255,1)"
    };
  },
  reset: function(material) {
    material.type = "basic";
    material.color = "rgba(255,255,255,1)";
  }
};
