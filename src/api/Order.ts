import request from '@/utils/Request'

export async function createOrder (gameId: number, price: number): Promise<boolean> {
  const data: any = await request.post('/order', { gameId, price })
  const status = data.status
  return !(status === 'FAIL')
}
