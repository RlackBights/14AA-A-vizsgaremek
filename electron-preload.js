process.once('loaded', () => {
    const { contextBridge, ipcRenderer, ipcMain } = require("electron");
    const electronHandler = {
        saveFile: (fileId, username, saveId, fileContent) => ipcRenderer.send('send-file', {fileId, username, saveId, fileContent}),
        getFile: async (fileId, username, saveId) => await ipcRenderer.invoke('get-file', {fileId, username, saveId}),
        createSaveFiles: async (username, saveId) => await ipcRenderer.send('create-file', {username, saveId})
    }
    
    contextBridge.exposeInMainWorld('electron', electronHandler);
    
    
    console.log("Preload loaded!");
})