require('babel-register')

if (!global.window) {
  const {
    mocks: {
      MockBrowser
    }
  } = require('mock-browser')

  global.document = MockBrowser.createDocument()
  global.window = MockBrowser.createWindow()
}

module.exports = require('./lib')
