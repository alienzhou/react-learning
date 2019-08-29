// cSpell: ignore alienact, sourcemap
const path = require('path');
const createConfig = require('../tools/rollup.config.creator');

module.exports = createConfig({
    subModuleName: 'core',
    sourceBase: __dirname
});