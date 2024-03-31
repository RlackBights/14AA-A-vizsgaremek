// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const express = require("express");
const cors = require("cors");
const { readFile, mkdir, writeFile, mkdirSync, writeFileSync, existsSync } = require("fs");
const localServerApp = express();
const PORT = 8088;
const isDev = process.argv[2] == '--dev';

const startLocalServer = (done) => {
  localServerApp.use(express.json({ limit: "100mb" }));
  localServerApp.use(cors());
  localServerApp.use(express.static(isDev ? './build/' : './resources/'));
  localServerApp.listen(PORT, async () => {
    console.log("Server Started on PORT ", PORT);
    done();
  });
};

const gamePath = `../Local/learnthebasics/`

function handleFileCreation(username, saveId)
{

  mkdirSync(path.join(app.getPath('appData'), gamePath, username, saveId), { recursive: true }, (err) => {
    if (err && err.code === "EEXISTS") console.log("Directory already exists, nothing to do");
  });

  for (let i = 0; i < 4; i++) {
    writeFileSync(path.join(app.getPath('appData'), gamePath, username, saveId, `jobContent${i}.txt`), "", {flag: "wx"} , (err) => {
      if (err && err.code === "EEXISTS") console.log("File already exists, nothing to do");
    });
  }
  
}

function writeToFile(fileId, username, saveId, fileContent)
{
  writeFileSync(path.join(app.getPath('appData'), gamePath, username, saveId, `jobContent${fileId}.txt`), fileContent, (err) => {
    if (err) console.log("👌👌👌");
  });
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    resizable: false,
    fullscreen: true,
    autoHideMenuBar: true,
    icon: path.join(__dirname, "/logo.png"),
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
      devTools: true,
      nodeIntegration: true,
      sandbox: false,
    },
  });

  // and load the index.html of the app.
  //   mainWindow.loadFile('index.html')
  mainWindow.loadURL("http://localhost:" + PORT);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  startLocalServer(createWindow);

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

let blockGetFile = false;
let blockSetFile = false;

ipcMain.on('send-file', (e, fileInfo) => {
  if (blockSetFile) return;
  blockSetFile = true;
  const { fileId, username, saveId, fileContent } = fileInfo;
  writeToFile( fileId, username, saveId, fileContent );
  blockSetFile = false;
});

ipcMain.handle('get-file', async (e, data) => {
  blockGetFile = true;
  return new Promise((resolve, reject) => {
    readFile(path.join(app.getPath('appData'), gamePath, data.username, data.saveId, `jobContent${data.fileId}.txt`), "utf-8", (err, data) => {
      if (err) {
        reject("File exists");
        blockGetFile = false;
        return;
      }
      blockGetFile = false;
      resolve(data);
    });

  }) 
});

ipcMain.on('create-file', async (e, data) => {
  handleFileCreation(data.username, data.saveId);
})