/* eslint-disable @typescript-eslint/no-explicit-any */

import request from '@/utils/Request'
import { GameProfile, parseGameProfile } from '@/typings/GameProfile'
import { GameDetail } from '@/typings/GameDetail'
import { Announcement, parseAnnouncement } from '@/typings/Announcement'
import { Discount, parseDiscount } from '@/typings/Discount'

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

export async function discounts (gameId: number): Promise<Array<Discount>> {
  const data: any = await request.get(`/discounts/${gameId}`)
  const discounts: Array<any> = data.discounts
  return discounts.filter(it => it !== null).map(it => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return parseDiscount(it)!
  }) || []
}

export async function addDiscount (discount: Discount): Promise<void> {
  const uploads = { ...discount }
  return await request.post(`/discount/${discount.gameId}`, uploads)
}
