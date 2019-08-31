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
import html from 'rollup-plugin-fill-html'
import del from 'del'
import { name as pkgName } from './package.json'

const outputEnv = process.env.OUTPUT_ENV
const isProd = process.env.NODE_ENV === 'production'
const buildDir = ({ docs: '.docs' })[outputEnv] || 'dist'
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
  json(),
  vue({ css: false }),
  postcss({
    minimize: isProd,
    extract: isProd ? outputEnv ? `${buildDir}/main.[hash].css` : `${buildDir}/index.css` : false
  }),
  buble({ objectAssign: true }),
  nodeResolve(),
  commonjs()
]

const prodPlugins = [
  copy({
    targets: [{ src: 'src/styles/fonts/*', dest: `${buildDir}/fonts` }]
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  terser({
    include: [/^.+\.min\.js$/]
  }),
  filesize({ showMinifiedSize: false })
]

const createDevConfig = () => {
  del.sync(`${devBase}/**`)
  return {
    input: path.resolve('samples/main.js'),
    output: {
      banner,
      format: 'umd',
      name: pkgName,
      file: path.resolve(`${devBase}/bundle.js`)
    },
    plugins: basePlugins.concat([
      html({
        template: 'public/index.html',
        filename: 'index.html'
      }),
      copy({
        targets: [{ src: 'src/styles/fonts/*', dest: `${devBase}/fonts` }]
      }),
      serve({
        contentBase: [devBase],
        historyApiFallback: true,
        port: 5000
      }),
      livereload()
    ])
  }
}

const createDocsConfig = () => {
  del.sync(`${buildDir}/**`)
  return {
    input: path.resolve('samples/main.js'),
    output: {
      format: 'umd',
      name: pkgName,
      file: path.resolve(`${buildDir}/bundle.[hash].min.js`)
    },
    plugins: [
      ...basePlugins,
      html({
        template: 'public/index.html'
      }),
      ...prodPlugins
    ]
  }
}

const createPordConfig = () => {
  del.sync(`${buildDir}/**`)
  return {
    input: path.resolve('src/index.js'),
    output: [['umd'], ['umd', true], ['cjs'], ['es']].map(([format, zip]) => {
      return {
        format,
        name: pkgName,
        file: path.resolve(`${buildDir}/${pkgName}.${format === 'cjs' ? 'common' : format}${zip ? '.min' : ''}.js`)
      }
    }),
    plugins: [...basePlugins, ...prodPlugins]
  }
}

export default outputEnv ? createDocsConfig() : isProd ? createPordConfig() : createDevConfig()