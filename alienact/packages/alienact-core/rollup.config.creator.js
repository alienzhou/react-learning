// cSpell: ignore alienact, sourcemap
const path = require('path');
const babel = require('rollup-plugin-babel');
const typescript = require('rollup-plugin-typescript2'); // notice ts version (https://github.com/ezolenko/rollup-plugin-typescript2/issues/88)
const {uglify} = require('rollup-plugin-uglify');

const LIB_NAME = 'alienact';
const buildDest = path.resolve(__dirname, '../../build');

module.exports = function createConfig({
    subModuleName,
    sourceBase
}) {
    if (!subModuleName) {
        throw 'please input a [subModuleName]';
    }

    if (!sourceBase) {
        throw 'please input a [sourceBase]';
    }

    const moduleName = LIB_NAME + '-' + subModuleName;
    return [{
        input: path.resolve(sourceBase, 'src/index.ts'),
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
            file: path.resolve(buildDest, moduleName, `${moduleName}.js`),
            format: 'umd',
            name: moduleName,
            sourcemap: true,
            globals: 'window'
        }]
    }, {
        input: path.resolve(sourceBase, 'src/index.ts'),
        plugins: [
            typescript({
                tsconfig: 'tsconfig.json'
            })
        ],
        output: [{
            file: path.resolve(buildDest, moduleName, `${moduleName}.esm.js`),
            format: 'esm',
            name: moduleName,
            sourcemap: true,
            globals: 'window'
        }]
    }];
}