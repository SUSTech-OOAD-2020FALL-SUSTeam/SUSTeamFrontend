import { LocalGameStatus } from '@/typings/LocalGameStatus'
import { GameProfile } from '@/typings/GameProfile'
import { IpcRenderer } from 'electron'
import { getToken } from '@/utils/Auth'

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

const ipcRenderer: IpcRenderer = window.ipcRenderer!
const require = window.require

const fs = require('fs-extra')
const unzipper = require('unzipper')

const appData = window.remote?.app.getPath('appData') as string
const root = `${appData}/susteam`
const tempDir = `${root}/temp`
const gameDir = `${root}/game`

let localGameStatusList: Array<LocalGameStatus> = []

export async function loadLocalGameStatus () {
  try {
    const readFile = await fs.readJson(`${root}/game_status.json`, { throws: false })
    localGameStatusList = readFile as Array<LocalGameStatus>
  } catch (err) {
    console.error('read game_status.json failed')
    console.error(err)
    localGameStatusList = []
  }
}

export async function saveLocalGameStatus () {
  await fs.writeJson(`${root}/game_status.json`, localGameStatusList)
}

export function localGameStatus (games: Array<GameProfile>): Array<{ game: GameProfile; status: LocalGameStatus }> {
  return games.map(game => {
    return {
      game: game,
      status: localGameStatusList.find(it => it.gameId === game.gameId) || { gameId: game.gameId, version: null }
    }
  })
}

const downloadTasks: { [key: number]: {resolve: (value?: any) => void;reject: (reason?: any) => void} } = {}

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

ipcRenderer.on('downloadEnd', (event, args: {id: number; path: string}) => {
  downloadTasks[args.id].resolve(args.path)
  delete downloadTasks[args.id]
})

ipcRenderer.on('downloadError', (event, args: {id: number; error: any}) => {
  downloadTasks[args.id].reject(args.error)
  delete downloadTasks[args.id]
})

export async function downloadGame (gameId: number) {
  const path = await downloadFile(`http://susteam.gogo.moe/api/game/${gameId}/version/v1.0/download`)
  const gamePath = `${gameDir}/${gameId}`
  await fs.mkdirs(gamePath)

  if (path.endsWith('.zip')) {
    await fs.createReadStream(path).pipe(unzipper.Extract({ path: gamePath }))
  } else {
    await fs.copy(path, gamePath)
  }

  const game = localGameStatusList.find(it => it.gameId === gameId)
  if (game) {
    game.version = 'v1.0'
  } else {
    localGameStatusList.push({ gameId: gameId, version: 'v1.0' })
  }

  await saveLocalGameStatus()
}

export async function launch () {
  ipcRenderer.send('vue-launch')
  await fs.mkdirs(root)
  await fs.mkdirs(tempDir)
  await loadLocalGameStatus()
}
