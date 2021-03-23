import dbConnect from '../../../utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../../model/User';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req

  await dbConnect()


  try {
    const users = await User.find({})
    res.status(200).json({ success: true, data: users })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}


