export interface Comment {
  username: string;
  gameId: number;
  commentTime: Date;
  content: string;
  score: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseComment (object: any): Comment {
  return {
    username: object.username,
    gameId: object.gameId,
    commentTime: new Date(object.commentTime),
    content: object.content,
    score: object.score
  }
}

export const EMPTY_COMMENT = parseComment({
  username: 'NULL',
  gameId: -1,
  commentTime: '2020-01-01T01:00:00.000Z',
  content: 'No comment',
  score: 0
})

export interface CommentThumb {
  commenter: string;
  gameId: number;
  username: string;
  vote: number;
}

export interface CommentWithThumb {
  username: string;
  gameId: number;
  commentTime: Date;
  content: string;
  score: number;
  vote?: number;
  thumbSummary? : ThumbSummary;
}

export interface ThumbSummary {
  commenter: string;
  upvote: number;
  downvote: number;
}
