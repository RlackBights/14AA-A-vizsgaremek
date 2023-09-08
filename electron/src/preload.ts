require('./rt/electron-rt');
//////////////////////////////
// User Defined Preload scripts below
console.log('User Preload!');
const { ipcRenderer } = require('electron');

document.getElementById('closeApp').addEventListener('click', () => {
  ipcRenderer.invoke('quit-app');
});