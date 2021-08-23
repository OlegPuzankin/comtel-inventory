// import { ItemStatus } from '../../../model/Item';
import { Location } from '../../../model/Location';
import dbConnect from '../../../utils/dbConnect'
import { Item } from '../../../model/Item'
import { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req


  await dbConnect()


  try {


    const data = await Item.updateMany(
      { '_id': { $in: body.selectedItemsId } },
      {
        responsiblePerson: body.responsibleUserId,
        // timestamp: new Date()
      });

    // await history.save()
    res.status(200).json({ success: true, data })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}


