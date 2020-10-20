const presets = [
  [
    '@babel/env',
    {
      useBuiltIns: 'usage',
      targets: {
        node: '12.9.0',
        browsers: [
          'last 2 versions'
        ]
      },
      corejs: 3
    }
  ]
]

const plugins = [
  '@babel/proposal-class-properties',
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
