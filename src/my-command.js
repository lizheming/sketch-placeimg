import sketch, { Image, Types, Rectangle } from 'sketch/dom'
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
  browserWindow.webContents.on('insert', function(width, height, category, filter) {
    const artboard = getSelectedArtboard();
    if(!artboard) {
      return sketch.UI.message('你没有选择画板');
    }
    const url = 'https://placeimg.com/' + [width, height, category, filter].join('/');
    new Image({
      image:  NSURL.URLWithString(url),
      parent: artboard,
      frame: new Rectangle(0, 0, width, height),
    });
    return browserWindow.close();
  });
  browserWindow.loadURL(require('../resources/webview.html'));
}

function getFirstArtboard() {
  const page = sketch.getSelectedDocument()?.pages[0];
  return page.layers.filter(({type}) => type === Types.Artboard);
}

function getSelectedArtboard() {
  const document = sketch.getSelectedDocument();
  if(!document) {
    return getFirstArtboard();
  }
  const { selectedLayers } = document;
  const artboards = selectedLayers.layers.filter(({type}) => type === Types.Artboard);
  if(artboards.length) {
    return artboards[0];
  }
  const parentArtboards = selectedLayers.map(layer => layer.getParentArtboard?.()).filter(Boolean);
  return [...new Set(parentArtboards)][0] ?? getFirstArtboard();
}