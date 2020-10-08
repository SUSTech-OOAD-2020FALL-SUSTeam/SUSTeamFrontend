export interface GameImage {
  gameId: number;
  url: string;
  type: string;
}

export interface GameDetail {
  gameId: number;
  name: string;
  price: number;
  publishDate: Date;
  author: string;
  introduction: string;
  description: string;
  images: Array<GameImage>;
  tags: Array<string>;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseGameImage (object: any): GameImage {
  return {
    gameId: object.gameId,
    url: object.url,
    type: object.type
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseGameDetail (object: any): GameDetail {
  return {
    gameId: object.gameId,
    name: object.name,
    price: object.price,
    publishDate: new Date(object.publishDate),
    author: object.author,
    introduction: object.introduction || '暂无介绍',
    description: object.description || '暂无介绍',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    images: (object.images as Array<any>).map(it => parseGameImage(it)),
    tags: object.tags || []
  }
}

export const EMPTY_GAME_DETAIL = parseGameDetail({
  gameId: -1,
  name: 'NULL',
  price: 0,
  publishDate: '2020-01-01T01:00:00.000Z',
  author: 'admin',
  images: []
})
