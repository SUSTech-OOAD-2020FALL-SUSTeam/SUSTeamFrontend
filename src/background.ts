import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path'
import Axios from 'axios'
import * as fs from 'fs-extra'
const isDevelopment = process.env.NODE_ENV !== 'production'

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let window: BrowserWindow

async function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true, // process.env.ELECTRON_NODE_INTEGRATION
      preload: path.join(__dirname, 'preload.js')
    }
  })
  window = win

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on('vue-launch', () => {
  console.log('vue-launch')
})

const appData = app.getPath('appData') as string
const root = `${appData}/susteam`
const tempDir = `${root}/temp`

ipcMain.on('download', (event, args: {url: string; id: number; token: string}) => {
  Axios.request({
    url: args.url,
    method: 'get',
    responseType: 'stream',
    headers: { authorization: `Bearer ${args.token}` }
  }).then(respond => {
    const { data, headers } = respond

    const totalLength: string = headers['content-length']
    const contentDisposition: string | undefined = headers['content-disposition']
    if (!contentDisposition) {
      console.error('download error')
      return
    }
    const filename = contentDisposition.match(/filename="(.*)"/)![1]

    const filePath = `${tempDir}/${filename}`
    const writer = fs.createWriteStream(filePath)

    const totalSize = parseInt(totalLength)
    let downloaded = 0
    data.on('data', (data: ArrayBuffer) => {
      downloaded += Buffer.byteLength(data)
      window.setProgressBar(downloaded / totalSize)
    })
    data.on('end', () => {
      window.setProgressBar(-1)
      event.sender.send('downloadEnd', { id: args.id, path: filePath })
    })
    data.on('error', (error: any) => {
      event.sender.send('downloadError', { id: args.id, error: error })
    })
    data.pipe(writer)
  })
})
