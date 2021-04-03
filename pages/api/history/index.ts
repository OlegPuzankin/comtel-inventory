import dbConnect from '../../../utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import { History } from '../../../model/History';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const { body } = req
  await dbConnect()
  try {
    const users = await History.find({}).sort({ date: 'desc' })
    res.status(200).json({ success: true, data: users })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}


