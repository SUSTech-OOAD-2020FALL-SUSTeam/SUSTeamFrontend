/* eslint-disable @typescript-eslint/no-explicit-any */

import request from '@/utils/Request'
import { GameProfile, parseGameProfile } from '@/typings/GameProfile'

export async function createOrder (gameId: number, price: number): Promise<void> {
  return await request.post('/order', { gameId, price })
}

export async function games (username: string): Promise<Array<GameProfile>> {
  const data: any = await request.get(`/user/${encodeURIComponent(username)}/games`)
  const games: Array<any> = data.games
  return games.map(it => parseGameProfile(it))
}
