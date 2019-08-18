import path from 'path'
import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import nodeGlobals from 'rollup-plugin-node-globals'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import alias from 'rollup-plugin-alias'
import url from 'rollup-plugin-url'
import copy from 'rollup-plugin-copy'
import json from 'rollup-plugin-json'

import { name as moduleName } from '../package.json'
const isProd = process.env.NODE_ENV === 'production'

export const resolveFile = filePath => path.join(__dirname, '..', filePath)

export default [
  {
    input: resolveFile('src/index.js'),
    output: {
      file: resolveFile(`dist/${moduleName}.umd.min.js`),
      format: 'umd',
      name: 'VueUI'
    },
    plugins: [
      alias({
        resolve: ['.js', '.vue', '.less', '.css'],
        '@': resolveFile('src')
      }),
      url(),
      copy({
        targets: [
          { src: 'src/fonts/*', dest: `${isProd ? 'dist' : 'public'}/fonts` }
        ]
      }),
      vue({
        css: false
      }),
      json(),
      nodeResolve(),
      commonjs(),
      nodeGlobals(),
      postcss({
        minimize: true
      }),
      buble({
        objectAssign: true
      })
    ]
  }
]