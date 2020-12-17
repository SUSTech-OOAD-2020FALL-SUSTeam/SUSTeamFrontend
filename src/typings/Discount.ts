export interface Discount {
  gameId: number;
  percentage: number;
  startTime: Date;
  endTime: Date;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseDiscount (object: any): Discount | null {
  if (object === null) {
    return null
  }
  return {
    gameId: object.gameId,
    percentage: object.percentage,
    startTime: new Date(object.startTime),
    endTime: new Date(object.endTime)
  }
}
