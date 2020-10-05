import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/
import BrowserWindow from 'sketch-module-web-view';
export default function() {
  const browserWindow = new BrowserWindow({
    width: 320,
    height: 240,
    resizable: false,
    movable: false,
    alwaysOnTop: true,
    maximizable: false,
    minimizable: false
  });
  browserWindow.loadURL(require('../resources/webview.html'))
}
