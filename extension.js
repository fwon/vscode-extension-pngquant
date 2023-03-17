const vscode = require('vscode')
const fs = require('fs')
var pngquant = require('node-pngquant-native');

function activate(context) {
  const createIndexCommand = vscode.commands.registerCommand(
    'compress_img',
    (uri, allUri) => {
      allUri.forEach(item => {
      const filePath = item.fsPath
      console.log('Compress file:' + filePath)
      fs.readFile(filePath, function (err, buffer) {
        if (err) throw err;
        var resBuffer = pngquant.compress(buffer);

        fs.writeFile(filePath, resBuffer, function (err) {
          console.log(err)
        });
      });
      })
    }
  )

  context.subscriptions.push(createIndexCommand)
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
}