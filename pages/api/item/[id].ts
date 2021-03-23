import { Item } from '../../../model/Item';
import dbConnect from '../../../utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a item by its ID */:
      try {
        const item = await Item.findById(id).populate('location')
        if (!item) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: item })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a item by its ID */:
      try {
        const item = await Item.findByIdAndUpdate(id, req.body, {
          new: true,
        })

        if (!item) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: item })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedItem = await Item.deleteOne({ _id: id })
        if (!deletedItem) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: deletedItem })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
