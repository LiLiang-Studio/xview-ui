import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import configList, { resolveFile } from './rollup.config'

configList.map((config, index) => {
  if (index === 0) {
    config.input = resolveFile('samples/main.js')
    config.output.file = resolveFile('public/index.js')
    config.plugins = [
      ...config.plugins,
      ...[
        serve({
          contentBase: ['public'],
          historyApiFallback: true
        }),
        livereload()
      ]
    ]
  }
  return config
})

export default configList