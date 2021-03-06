import { Location } from './../../../model/Location';
import dbConnect from '../../../utils/dbConnect'
import { Item } from '../../../model/Item'
import { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {

        const items = await Item.find({})
          .populate('location')
          .populate('responsiblePerson')
          .sort({ name: 1 })
        res.status(200).json({ success: true, data: items })
      } catch (error) {
        console.log('get items error-->', error)
        res.status(400).json({ success: false, error })
      }
      break
    case 'POST':
      try {
        // const location = await Location.findById(body.location)


        const item = new Item(
          {
            name: body.name,
            imageKey: body.imageKey,
            location: body.location,
            type: body.type,
            createdBy: body.createdBy
          })
        await item.save()
        res.status(201).json({ success: true, data: item })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
