// cSpell: ignore alienact, sourcemap
const path = require('path');
const babel = require('rollup-plugin-babel');
const typescript = require('rollup-plugin-typescript2'); // notice ts version (https://github.com/ezolenko/rollup-plugin-typescript2/issues/88)
const {uglify} = require('rollup-plugin-uglify');

const MODULE_NAME = 'alienact-core';
const ENTRY = path.resolve(__dirname, 'src/index.ts');
const DEST = path.resolve(__dirname, '..', '..', 'build/', MODULE_NAME);

module.exports = [{
    input: ENTRY,
    plugins: [
        typescript({
            tsconfig: 'tsconfig.json'
        }),
        babel({
            runtimeHelpers: true
        }),
        uglify()
    ],
    output: [{
        file: path.resolve(DEST, `${MODULE_NAME}.js`),
        format: 'umd',
        name: MODULE_NAME,
        sourcemap: true,
        globals: 'window'
    }]
}, {
    input: ENTRY,
    plugins: [
        typescript({
            tsconfig: 'tsconfig.json'
        })
    ],
    output: [{
        file: path.resolve(DEST, `${MODULE_NAME}.esm.js`),
        format: 'esm',
        name: MODULE_NAME,
        sourcemap: true,
        globals: 'window'
    }]
}]