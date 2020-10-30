const ipcRenderer = window.ipcRenderer

export function launch () {
  if (ipcRenderer === undefined) {
    return
  }
  ipcRenderer.send('vue-launch')
}
