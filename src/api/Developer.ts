/* eslint-disable @typescript-eslint/no-explicit-any */

import request from '@/utils/Request'
import { GameProfile, parseGameProfile } from '@/typings/GameProfile'

export async function games (): Promise<Array<GameProfile>> {
  const data: any = await request.get('/dev/games')
  const games: Array<any> = data.games
  return games.map(it => parseGameProfile(it))
}
