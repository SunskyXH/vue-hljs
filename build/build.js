var fs = require('fs')
var rollup = require('rollup')
var uglify = require('uglify-js')
var babel = require('rollup-plugin-babel')
var packge = require('../package.json')

rollup.rollup({
    entry: 'src/index.js',
    plugins: [
        babel({
            presets: ['es2015-loose-rollup'],
            exclude: 'node_modules/**'
        })
    ]
})
.then(function (bundle) {
    return write('dist/vue-hljs.js', bundle.generate({
        format: 'umd',
        moduleName: 'VueHighlight'
    }).code, bundle);
})
.then(function (bundle) {
    return write('dist/vue-hljs.min.js', uglify.minify('dist/vue-hljs.js').code, bundle);
})
.catch(logError)

function write(dest, code, bundle) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(dest, code, function (err) {
            if (err) return reject(err);
            console.log('str size:' + getSize(code));
            resolve(bundle)
        });
    });
}

function getSize(str) {
    return (str.length / 1024).toFixed(2) + 'kb';
}

function logError(e) {
    console.error(e)
}