const path = require('path');

// eslint-disable-next-line func-names
module.exports = function() {
  return {
    name: 'docusaurus-plugin-hotjar',

    getClientModules() {
      return [path.resolve(__dirname, './hotjar')];
    }
  };
};
