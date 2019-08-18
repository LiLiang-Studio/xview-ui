process.env.NODE_ENV = 'production'

import { terser } from 'rollup-plugin-terser'
import cleanup from 'rollup-plugin-cleanup'
import filesize from 'rollup-plugin-filesize'
import configList from './rollup.config'

configList.map(config => {
  config.plugins = [
    ...config.plugins,
    ...[
      terser(),
      cleanup(),
      filesize()
    ]
  ]
  return config
})

export default configList