// import { ItemStatus } from '../../../model/Item';
import { History } from './../../../model/History';
import { Location } from './../../../model/Location';
import dbConnect from '../../../utils/dbConnect'
import { Item } from '../../../model/Item'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client';
import { User } from '../../../model/User';
import { ItemStatus } from '../../../interfaces/common_interfaces';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req

  await dbConnect()


  try {
    const { user } = await getSession({ req })
    const _user = await User.findOne({ email: user.email })

    const history = new History({
      date: new Date(),
      user: _user,
      description: await getMoveHistoryDescription(body.selectedItemsId, body.locationId)
    })


    const data = await Item.updateMany(
      { '_id': { $in: body.selectedItemsId } },
      {
        location: body.locationId,
        responsiblePerson: _user,
        status: ItemStatus.Pending,
        timestamp: new Date()
      });

    await history.save()
    res.status(200).json({ success: true, data })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}


async function getMoveHistoryDescription(itemsId: Array<string>, locationId: string) {
  const items = await Item.find({ '_id': { $in: itemsId } }).populate('location')
  const loc = await Location.findById(locationId)

  const _items = items.map(i => {
    return `${i.name} from  ${i.location.name}`
  }).join(', ')


  return `Items ${_items} was moved to ${loc.name}`

}