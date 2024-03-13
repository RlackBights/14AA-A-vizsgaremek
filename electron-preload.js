const { contextBridge, ipcRenderer } = require("electron");

console.log("Preload loaded!");

const electronHandler = {
    sendFile: (args) => ipcRenderer.send('send-file', args)
}

contextBridge.exposeInMainWorld('electron', electronHandler);