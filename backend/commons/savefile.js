'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.saveFile = void 0
var fs = require('fs')
var path = require('path')
var baseDir = path.resolve(__dirname, '../out')
function saveFile(fileName, buf) {
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir)
  }
  fs.writeFileSync(path.resolve(baseDir, fileName), buf)
}
exports.saveFile = saveFile
