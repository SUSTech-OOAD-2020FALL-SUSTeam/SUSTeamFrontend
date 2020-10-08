/* eslint-disable @typescript-eslint/no-explicit-any */

import { GameProfile, parseGameProfile } from '@/typings/GameProfile'
import request from '@/utils/Request'
import { GameDetail, parseGameDetail } from '@/typings/GameDetail'

export async function recommendGames (): Promise<Array<GameProfile>> {
  const data: any = await request.get('/games/recommend')
  const games: Array<any> = data.games
  return games.map(it => parseGameProfile(it))
}

export async function games (order: string | undefined = undefined): Promise<Array<GameProfile>> {
  const data: any = await request.get('/games', { params: { order: order } })
  const games: Array<any> = data.games
  return games.map(it => parseGameProfile(it))
}

export async function tags (): Promise<Array<string>> {
  const data: any = await request.get('/tags')
  return data.tags
}

export async function gamesWithTag (tags: Array<string>): Promise<Array<GameProfile>> {
  const params = new URLSearchParams()
  tags.forEach(it => {
    params.append('tag', it)
  })

  const data: any = await request.get('/games/tags', { params: params })
  const games: Array<any> = data.games
  return games.map(it => parseGameProfile(it))
}

export async function gameDetail (gameId: number): Promise<GameDetail> {
  const data: any = await request.get(`/game/${gameId}/detail`)
  return parseGameDetail(data.gameDetail)
}
