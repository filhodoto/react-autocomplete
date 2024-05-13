// Mock css transformer so jest does not break when running a files that imports a css file
module.exports = {
  process() {
    return {
      code: `module.exports = {};`,
    };
  },
};
