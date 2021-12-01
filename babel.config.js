const presets = [
  [
    '@babel/env',
    {
      targets: {
        node: 'current',
        browsers: [
          'last 2 versions'
        ]
      },
      useBuiltIns: 'usage',
      corejs: 3
    }
  ]
]

const plugins = [
  '@babel/proposal-class-properties',
  '@babel/proposal-export-default-from',
  [
    'module-resolver', {
      root: ['./src'],
      cwd: 'babelrc',
      alias: {
        '@sequencemedia/rasher': '.',
        '~': './src'
      }
    }
  ]
]

module.exports = {
  compact: true,
  presets,
  plugins
}
