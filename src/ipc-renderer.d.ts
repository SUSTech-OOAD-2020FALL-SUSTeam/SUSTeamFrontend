import { IpcRenderer, Remote } from 'electron'

declare global {
  interface Window {
    ipcRenderer: IpcRenderer | undefined;
    remote: Remote | undefined;
  }
}
