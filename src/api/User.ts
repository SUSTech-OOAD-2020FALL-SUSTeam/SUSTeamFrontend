/* eslint-disable @typescript-eslint/no-explicit-any */

import request from '@/utils/Request'
import { parseUserRole, UserRole } from '@/typings/User'
// import { User, parseUser } from '@/typings/User'

export async function login (username: string, password: string): Promise<string> {
  const data: any = await request.post('/token', { username, password })
  return data.token
}

export async function token (): Promise<UserRole> {
  const data: any = await request.get('/token')
  if (!data.token) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('Token invalid')
  }
  return parseUserRole(data.userRole)
}

export async function signup (username: string, password: string, mail: string): Promise<any> {
  await request.post('/user', { username, password, mail })
}

export async function uploadAvatar (username: string, file: File): Promise<void> {
  const form = new FormData()
  form.append('file', file)
  return await request.put(`/user/${encodeURIComponent(username)}/avatar`, form)
}

export async function updateDescription (username: string, description: string): Promise<void> {
  return await request.put(`/user/${encodeURIComponent(username)}`, { description })
}
