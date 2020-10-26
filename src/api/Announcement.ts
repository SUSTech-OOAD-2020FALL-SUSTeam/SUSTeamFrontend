/* eslint-disable @typescript-eslint/no-explicit-any */

import request from '@/utils/Request'
import { Announcement, parseAnnouncement } from '@/typings/Announcement'

export async function gameAnnouncements (gameId: number): Promise<Array<Announcement>> {
  const data: any = await request.get(`/game/${gameId}/announcements`)
  const announcements: Array<any> = data.announcements
  return announcements.map(it => parseAnnouncement(it))
}
