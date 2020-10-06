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

export async function tags (): Promise<Array<string>> {
  const data: Record<string, any> = await request.get('/tags')
  return data.tags
}

export async function gamesWithTag (tags: Array<string>): Promise<Array<GameProfile>> {
  const params = new URLSearchParams()
  tags.forEach(it => { params.append('tag', it) })

  const data: Record<string, any> = await request.get('/games/tags', { params: params })
  const games: Array<Record<string, any>> = data.games
  return games.map((it: any) => parseGameProfile(it))
}
