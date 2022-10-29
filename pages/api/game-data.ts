// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToMongo, disconnectFromMongo, collections } from '../../game-data-utils/connect'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    await connectToMongo()

    const collection = collections['game-data']

    await collection?.insertOne(req.body)

    await disconnectFromMongo()
  res.status(200).json({ status: 'Game data written to Mongo' })
}
