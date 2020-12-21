/* eslint-disable @typescript-eslint/no-explicit-any */

import request from '@/utils/Request'
import { GameProfile, parseGameProfile } from '@/typings/GameProfile'
import { GameDetail } from '@/typings/GameDetail'
import { Announcement, parseAnnouncement } from '@/typings/Announcement'

export async function games (): Promise<Array<GameProfile>> {
  const data: any = await request.get('/dev/games')
  const games: Array<any> = data.games
  return games.map(it => parseGameProfile(it))
}

export async function updateGame (game: GameDetail): Promise<void> {
  return await request.put(`/game/${game.gameId}`, { game: game })
}

export async function announcements (gameId: number): Promise<Array<Announcement>> {
  const data: any = await request.get(`/game/${gameId}/announcements`)
  const announcements: Array<any> = data.announcements
  return announcements.map(it => parseAnnouncement(it))
}

export async function addAnnouncement (announce: Announcement): Promise<void> {
  return await request.post('/announcement', { ...announce })
}
