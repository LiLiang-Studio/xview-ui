import buble from '@rollup/plugin-buble'
import url from '@rollup/plugin-url'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'
import del from 'del'
import { name as pkgName, version } from './package.json'

const banner =
  '/*!\n' +
  ` * ${pkgName} v${version}\n` +
  ` * (c) 2019-${new Date().getFullYear()} LiLiang\n` +
  ' * Released under the MIT License.\n' +
  ' */'

del.sync('dist/*')

export default {
  input: 'src/index.js',
  plugins: [
    resolve(),
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
      banner,
      format: 'umd',
      name: 'XViewUI',
      file: `dist/${pkgName}.umd.min.js`
    },
    {
      banner,
      format: 'cjs',
      file: `dist/${pkgName}.common.js`
    },
    {
      banner,
      format: 'es',
      file: `dist/${pkgName}.es.js`
    }
  ],
  external: ['vue']
}