// cSpell: ignore alienact, sourcemap
const path = require('path');
const babel = require('rollup-plugin-babel');
const typescript = require('rollup-plugin-typescript2'); // notice ts version (https://github.com/ezolenko/rollup-plugin-typescript2/issues/88)
const {uglify} = require('rollup-plugin-uglify');

const LIB_NAME = 'alienact';

module.exports = [{
    input: path.resolve(__dirname, 'src/index.ts'),
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
        file: path.resolve(__dirname, 'build', `${LIB_NAME}.js`),
        format: 'umd',
        name: LIB_NAME,
        sourcemap: true,
        globals: 'window'
    }]
}, {
    input: path.resolve(__dirname, 'src/index.ts'),
    plugins: [
        typescript({
            tsconfig: 'tsconfig.json'
        })
    ],
    output: [{
        file: path.resolve(__dirname, 'build', `${LIB_NAME}.esm.js`),
        format: 'esm',
        name: LIB_NAME,
        sourcemap: true,
        globals: 'window'
    }]
}];