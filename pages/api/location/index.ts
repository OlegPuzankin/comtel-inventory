import dbConnect from '../../../utils/dbConnect'
import { Location } from '../../../model/Location'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const locations = await Location.find({}, ['name', 'locationType'])
        res.status(200).json({ success: true, data: locations })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const location = await Location.create(body)
        res.status(201).json({ success: true, data: location })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}