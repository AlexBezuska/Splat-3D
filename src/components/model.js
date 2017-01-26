module.exports = {
  factory: function() {
    return {
      type: "cube"
    };
  },
  reset: function(model) {
    model.type = "cube";
  }
};
