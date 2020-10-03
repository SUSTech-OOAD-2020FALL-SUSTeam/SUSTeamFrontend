export interface GameProfile {
  id: number;
  name: string;
  price: number;
  publishDate: Date;
  author: string;
  introduction: string;
  imageFullSize: string;
  imageCardSize: string;
}

export function parseGameProfile(object: any): GameProfile {
  return {
    id: object.id,
    name: object.name,
    price: object.price,
    publishDate: new Date(object.publishDate),
    author: object.author,
    introduction: object.introduction || '暂无介绍',
    imageFullSize: object.imageFullSize || '/default_full.jpg',
    imageCardSize: object.imageCardSize || '/default_card.jpg'
  }
}

export const EMPTY_GAME = parseGameProfile({
  id: -1,
  name: 'NULL',
  price: 0,
  publishDate: '2020-01-01T01:00:00.000Z',
  author: 'admin'
})
