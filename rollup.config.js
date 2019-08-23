import path from 'path'
import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import alias from 'rollup-plugin-alias'
import url from 'rollup-plugin-url'
import json from 'rollup-plugin-json'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import replace from 'rollup-plugin-replace'
import del from 'del'
import pkg from './package.json'

const isProd = process.env.NODE_ENV === 'production'
const buildDir = 'dist'
const devBase = '.devbase'
const banner = `
  var process = {
    env: {
      NODE_ENV: '${process.env.NODE_ENV}'
    }
  };
`

const basePlugins = [
  alias({
    '@': path.resolve('src'),
    resolve: ['.js', '.vue', '.css', '.less']
  }),
  url(),
  copy({
    targets: [
      { src: 'src/styles/fonts/*', dest: `${isProd ? buildDir : devBase}/fonts` },
      !isProd && { src: 'public/*', dest: devBase }
    ].filter(_ => _)
  }),
  json(),
  vue({ css: false }),
  postcss({ minimize: isProd }),
  buble({ objectAssign: true }),
  nodeResolve(),
  commonjs()
]

const createDevConfig = () => {
  del.sync(`${devBase}/**`)
  return {
    input: path.resolve('samples/main.js'),
    output: {
      banner,
      format: 'umd',
      name: pkg.name,
      file: path.resolve(`${devBase}/bundle.js`)
    },
    plugins: basePlugins.concat([
      serve({
        contentBase: [devBase],
        historyApiFallback: true,
        port: 5000
      }),
      livereload()
    ])
  }
}

const createPordConfig = () => {
  del.sync(`${buildDir}/**`)
  return {
    input: path.resolve('src/index.js'),
    output: [
      {
        format: 'umd',
        name: pkg.name,
        file: path.resolve(`${buildDir}/${pkg.name}.umd.js`)
      },
      {
        format: 'umd',
        name: pkg.name,
        file: path.resolve(`${buildDir}/${pkg.name}.umd.min.js`)
      },
      {
        format: 'cjs',
        file: path.resolve(`${buildDir}/${pkg.name}.common.js`)
      },
      {
        format: 'es',
        file: path.resolve(`${buildDir}/${pkg.name}.es.js`)
      }
    ],
    plugins: basePlugins.concat([
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      terser({
        include: [/^.+\.min\.js$/]
      }),
      filesize({ showMinifiedSize: false })
    ])
  }
}

export default isProd ? createPordConfig() : createDevConfig()