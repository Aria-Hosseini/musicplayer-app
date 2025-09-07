import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "path";

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(process.cwd(), "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadURL("http://localhost:5173"); 
});

ipcMain.handle("add-songs", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openFile", "multiSelections"],
    filters: [{ name: "Audio", extensions: ["mp3", "wav", "ogg"] }]
  });

  if (result.canceled) return [];

  const files = result.filePaths.map(filePath => ({
    name: path.basename(filePath),
    path: filePath
  }));

  return files;
});
