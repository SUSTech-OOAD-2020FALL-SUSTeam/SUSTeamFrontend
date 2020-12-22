import { LocalGameStatus, LocalGameStatusMap } from '@/typings/LocalGameStatus'
import { IpcRenderer } from 'electron'
import { getToken } from '@/utils/Auth'
import { versions } from '@/api/Version'

import * as config from './Config'

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

const ipcRenderer: IpcRenderer = window.ipcRenderer!
const require = window.require

const fs = require('fs-extra')
const unzipper = require('unzipper')
const os = require('os')
const childProcess = require('child_process')

const appData = window.remote?.app.getPath('appData') as string
const root = `${appData}/susteam`
const tempDir = `${root}/temp`
const gameDir = `${root}/game`

const localGameStatusMap: LocalGameStatusMap = new LocalGameStatusMap()

export async function loadLocalGameStatus () {
  try {
    const readFile = await fs.readJson(`${root}/game_status.json`, { throws: false })
    const localGameStatusList = readFile as Array<LocalGameStatus>
    localGameStatusMap.merge(localGameStatusList)
  } catch (err) {
    console.error('read game_status.json failed')
    console.error(err)
  }
}

export async function saveLocalGameStatus () {
  await fs.writeJson(`${root}/game_status.json`, localGameStatusMap.toList())
}

export function localGameStatus (): LocalGameStatusMap {
  return localGameStatusMap
}

const downloadTasks: { [key: number]: { resolve: (value?: any) => void; reject: (reason?: any) => void } } = {}

export async function downloadFile (url: string): Promise<string> {
  const id = Math.floor(Math.random() * 100000)
  ipcRenderer.send('download', {
    url: url,
    id: id,
    token: getToken()!
  })
  return new Promise((resolve, reject) => {
    downloadTasks[id] = { resolve, reject }
  })
}

ipcRenderer.on('downloadEnd', (event, args: { id: number; path: string }) => {
  downloadTasks[args.id].resolve(args.path)
  delete downloadTasks[args.id]
})

ipcRenderer.on('downloadError', (event, args: { id: number; error: any }) => {
  downloadTasks[args.id].reject(args.error)
  delete downloadTasks[args.id]
})

export async function downloadGame (gameId: number, branch: string) {
  const versionList = await versions(gameId, branch)
  if (versionList.length === 0) {
    throw new Error(`No Versions of Branch ${branch}`)
  }
  const lastVersion = versionList[0]
  const version = lastVersion.name

  const url = `${config.HOST}${config.API_BASE}/game/${gameId}/version/${encodeURIComponent(version)}/download`
  const path = await downloadFile(url)

  const gamePath = `${gameDir}/${gameId}/${branch}`
  await fs.mkdirs(gamePath)

  if (path.endsWith('.zip')) {
    await fs.createReadStream(path).pipe(unzipper.Extract({ path: gamePath }))
  } else {
    await fs.copy(path, gamePath)
  }

  localGameStatusMap.set(gameId, branch, version)

  await saveLocalGameStatus()
}

export async function upgradeGame (gameId: number, branch: string) {
  const currentVersion = localGameStatusMap.get(gameId, branch)
  if (currentVersion === null) {
    await downloadGame(gameId, branch)
    return
  }

  const versionList = await versions(gameId, branch)
  if (versionList.length === 0) {
    throw new Error(`No Versions of Branch ${branch}`)
  }

  const index = versionList.findIndex(it => it.name === currentVersion)

  if (index <= 0) {
    return
  }

  const gamePath = `${gameDir}/${gameId}/${branch}`
  await fs.mkdirs(gamePath)

  for (let i = index - 1; i >= 0; i--) {
    const version = versionList[i]
    const url = `${config.HOST}${config.API_BASE}/game/${gameId}/version/${encodeURIComponent(version.name)}/update/download`
    const path = await downloadFile(url)

    if (path.endsWith('.zip')) {
      const extractPath = `${root}/temp/update/${gameId}`
      await fs.mkdirs(extractPath)
      await new Promise(resolve =>
        fs.createReadStream(path)
          .pipe(unzipper.Extract({ path: extractPath }))
          .on('finish', resolve)
      )
      await fs.copy(extractPath, gamePath, { overwrite: true })
      await fs.remove(extractPath)
    } else {
      await fs.copy(path, gamePath, { overwrite: true })
    }
  }

  localGameStatusMap.set(gameId, branch, versionList[0].name)

  await saveLocalGameStatus()
}

export async function launchGame (gameId: number, branch: string) {
  const gamePath = `${gameDir}/${gameId}/${branch}`

  let launchFile: string
  if (os.type().toLowerCase().includes('windows')) {
    launchFile = `${gamePath}/launch.bat`
  } else {
    launchFile = `${gamePath}/launch.sh`
  }

  if (!await fs.pathExists(launchFile)) {
    throw new Error('launch file not exist')
  }

  childProcess.execFile(launchFile, [getToken()!], {
    cwd: gamePath
  }, (error: any, stdout: string, stderr: string) => {
    if (error) {
      throw error
    }
    console.log(stdout)
    console.error(stderr)
  })
}

export async function launch () {
  ipcRenderer.send('vue-launch')
  await fs.mkdirs(root)
  await fs.mkdirs(tempDir)
  await loadLocalGameStatus()
}
