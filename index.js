require('babel-register')

if (!global.document || !global.window) {
  const {
    mocks: {
      MockBrowser
    }
  } = require('mock-browser')

  global.document = global.document || MockBrowser.createDocument()
  global.window = global.window || MockBrowser.createWindow()
}

module.exports = require('./lib')
