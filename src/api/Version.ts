/* eslint-disable @typescript-eslint/no-explicit-any */

import request from '@/utils/Request'
import { GameVersion, parseGameVersion } from '@/typings/GameVersion'

export async function branches (gameId: number): Promise<Array<string>> {
  const data: any = await request.get(`/game/${gameId}/version/branches`)
  return data.branches as Array<string>
}

export async function versions (gameId: number, branch: string): Promise<Array<GameVersion>> {
  const data: any = await request.get(`/game/${gameId}/version/branch/${encodeURIComponent(branch)}`)
  const versions: Array<any> = data.versions
  return versions.map(it => parseGameVersion(it))
}

export async function upload (gameId: number, file: File): Promise<string> {
  const form = new FormData()
  form.append('file', file)
  const data: any = await request.post(`/game/${gameId}/upload`, form, { headers: { 'Content-Type': 'multipart/form-data' } })
  return data.url as string
}

export async function createVersion (version: GameVersion): Promise<void> {
  return await request.post(`/game/${version.gameId}/version`, version)
}
