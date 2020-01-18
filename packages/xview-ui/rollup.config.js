import path from 'path'
import buble from '@rollup/plugin-buble'
import url from '@rollup/plugin-url'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'
import del from 'del'
import { name as pkgName } from './package.json'

del.sync('dist/*')

export default {
  input: 'src/index.js',
  plugins: [
    alias({
      entries: [
        {
          find: '@',
          replacement: path.join(__dirname, 'src')
        }
      ]
    }),
    url(),
    json(),
    vue({ css: false }),
    postcss({
      minimize: true,
      extract: 'dist/index.css'
    }),
    buble({ objectAssign: true }),
    copy({
      targets: [{ src: 'src/styles/fonts/*', dest: 'dist/fonts' }]
    }),
    commonjs(),
    terser({
      include: [/^.+\.min\.js$/]
    })
  ],
  output: [
    {
      format: 'umd',
      name: pkgName,
      file: `dist/${pkgName}.umd.js`
    },
    {
      format: 'umd',
      name: pkgName,
      file: `dist/${pkgName}.umd.min.js`
    },
    {
      format: 'cjs',
      file: `dist/${pkgName}.common.js`
    },
    {
      format: 'es',
      file: `dist/${pkgName}.es.js`
    }
  ]
}