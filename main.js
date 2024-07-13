const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// Activer le rechargement automatique pour le développement
require('electron-reload')(path.join(__dirname, 'dist'), {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Charger le fichier index.html de l'application Angular
  // const startUrl = process.env.ELECTRON_START_URL || url.format({
  //   pathname: path.join(__dirname, 'dist/password-manager-app/browser/index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // });

// Charger le fichier index.html de l'application Angular
  mainWindow.loadURL('http://localhost:4200/dashboard'); // L'URL de l'application Angular en mode de développement

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
