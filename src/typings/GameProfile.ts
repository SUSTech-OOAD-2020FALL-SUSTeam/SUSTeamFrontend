import { Discount, parseDiscount } from '@/typings/Discount'

export interface GameProfile {
  gameId: number;
  name: string;
  price: number;
  publishDate: Date;
  author: string;
  introduction: string;
  imageFullSize: string;
  imageCardSize: string;
  discount: Discount | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseGameProfile (object: any): GameProfile {
  return {
    gameId: object.gameId,
    name: object.name,
    price: object.price,
    publishDate: new Date(object.publishDate),
    author: object.author,
    introduction: object.introduction || '暂无介绍',
    imageFullSize: object.imageFullSize || '/default_full.jpg',
    imageCardSize: object.imageCardSize || '/default_card.jpg',
    discount: parseDiscount(object.discount)
  }
}

export const EMPTY_GAME = parseGameProfile({
  gameId: -1,
  name: 'NULL',
  price: 0,
  publishDate: '2020-01-01T01:00:00.000Z',
  author: 'admin',
  discount: null
})
