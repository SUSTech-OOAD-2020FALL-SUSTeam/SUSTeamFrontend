/* eslint-disable @typescript-eslint/no-explicit-any */

import request from '@/utils/Request'
import { Friend, parseFriend } from '@/typings/Friend'
import { parseUser, User } from '@/typings/User'

export async function friends (): Promise<Array<Friend>> {
  const data: any = await request.get('/friend')
  const friendsList: Array<any> = data.friends
  return friendsList.map(it => parseFriend(it))
}

export async function getUser (username: string): Promise<User> {
  const data: any = await request.get(`/user/${username}`)
  const user: any = data.user
  return parseUser(user)
}
