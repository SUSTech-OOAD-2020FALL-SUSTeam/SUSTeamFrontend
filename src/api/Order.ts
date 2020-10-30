import request from '@/utils/Request'

export async function createOrder (gameId: number, price: number): Promise<void> {
  return await request.post('/order', { gameId, price })
}
