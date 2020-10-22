/* eslint-disable @typescript-eslint/no-explicit-any */

import request from '@/utils/Request'
import { Comment, parseComment } from '@/typings/Comment'

export async function gameComments (gameId: number): Promise<Array<Comment>> {
  const data: any = await request.get(`/game/${gameId}/comments`)
  const comments: Array<any> = data.comments
  return comments.map(it => parseComment(it))
}

export async function createComment (gameId: number, score: number, content: string) {
  return await request.post('/comment', { gameId, score, content })
}

export async function updateComment (gameId: number, score: number, content: string) {
  return await request.put('/comment', { gameId, score, content })
}
