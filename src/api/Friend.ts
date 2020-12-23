/* eslint-disable @typescript-eslint/no-explicit-any */

import request from '@/utils/Request'
import { Friend, FriendReply, parseFriend, parseFriendInvitation } from '@/typings/Friend'
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

export async function getInvitations (): Promise<Array<FriendReply>> {
  const data: any = await request.get('/friend/reply')
  const reply: Array<any> = data.reply
  return reply.map(it => parseFriendInvitation(it))
}

export async function addFriend (username: string) {
  await request.get(`/friend/apply/${username}`)
}

export async function replyTo (username: string, agree: boolean) {
  await request.post(`/friend/reply/${username}`, { agree: agree })
}
