import { Location } from './../../../model/Location';
import dbConnect from '../../../utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const location = await Location.findById(id)
        if (!location) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: location })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const location = await Location.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!location) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: location })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedLocation = await Location.deleteOne({ _id: id })
        if (!deletedLocation) {
          return res.status(400).json({ success: false, data: deletedLocation })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
