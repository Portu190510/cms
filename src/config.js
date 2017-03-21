var configSource = require('./configSource.json');

var config = () => {
  return configSource
};

export default new config();