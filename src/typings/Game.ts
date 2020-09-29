export interface Game {
  id: number;
  name: string;
  price: number;
  publishDate: Date;
  author: string;
  description: string | null;
  imageFullSize: string;
  imageCardSize: string;
}

export function parseGame (object: any): Game {
  return {
    id: object.id,
    name: object.name,
    price: object.price,
    publishDate: new Date(object.publishDate),
    author: object.author,
    description: object.description,
    imageFullSize: object.imageFullSize,
    imageCardSize: object.imageCardSize
  }
}
