module.exports = {
  presets: [
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
  ],
  plugins: [
    [
      'module-resolver', {
        alias: {
          '@sequencemedia/rasher': '.',
          '~': './src'
        }
      }
    ]
  ]
}
