import { GameProfile, parseGameProfile } from '@/typings/GameProfile'
import request from '@/utils/Request'

export async function recommendGames (): Promise<Array<GameProfile>> {
  const data: Record<string, any> = await request.get('/games/recommend')
  const games: Array<Record<string, any>> = data.games
  return games.map((it: any) => parseGameProfile(it))
}

export async function games (order: string | undefined = undefined): Promise<Array<GameProfile>> {
  const data: Record<string, any> = await request.get('/games', { params: { order: order } })
  const games: Array<Record<string, any>> = data.games
  return games.map((it: any) => parseGameProfile(it))
}
