const ipcRenderer = window.ipcRenderer
const require = window.require
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra')

export async function launch () {
  if (ipcRenderer === undefined) {
    return
  }
  ipcRenderer.send('vue-launch')
  const appData = window.remote?.app.getPath('appData') as string
  const root = `${appData}/susteam`
  await fs.mkdirs(root)
}
