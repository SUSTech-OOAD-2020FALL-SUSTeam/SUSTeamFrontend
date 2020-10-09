/* eslint-disable @typescript-eslint/no-explicit-any */

import request from '@/utils/Request'
import { Comment, parseComment } from '@/typings/Comment'

export async function gameComments (gameId: number): Promise<Array<Comment>> {
  const data: any = await request.get(`/game/${gameId}/comment`)
  const comments: Array<any> = data.comments
  return comments.map(it => parseComment(it))
}
