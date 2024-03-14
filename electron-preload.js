process.once('loaded', () => {
    const { contextBridge, ipcRenderer, ipcMain } = require("electron");
    const electronHandler = {
        saveFile: (fileName, fileContent) => ipcRenderer.send('send-file', {fileName, fileContent}),
        getFile: async (fileName) => await ipcRenderer.invoke('get-file', fileName)
    }
    
    contextBridge.exposeInMainWorld('electron', electronHandler);
    
    
    console.log("Preload loaded!");
})