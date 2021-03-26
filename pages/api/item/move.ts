// import { ItemStatus } from '../../../model/Item';
import { History } from './../../../model/History';
import { Location } from './../../../model/Location';
import dbConnect from '../../../utils/dbConnect'
import { Item } from '../../../model/Item'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client';
import { User } from '../../../model/User';
import { ItemStatus, LocationType } from '../../../interfaces/common_interfaces';



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

    await history.save()

    const data = await Item.updateMany(
      { '_id': { $in: body.selectedItemsId } },
      {
        location: body.locationId,
        responsiblePerson: _user,
        status: ItemStatus.Pending,
        timestamp: new Date()
      });

    res.status(200).json({ success: true, data })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}


async function getMoveHistoryDescription(itemsId: Array<string>, locationId: string) {
  const items = await Item.find({ '_id': { $in: itemsId } }).populate('location')
  const destinationLocation = await Location.findById(locationId)
  console.log('dest', destinationLocation.name);
  console.log('source', items[0].location.name);
  console.log('destinationLocation', destinationLocation.locationType);


  const text = ['Iнструмент ']



  text[1] = items.map(i => {
    return `${i.name}`
  }).join(', ')

  if (destinationLocation.locationType === 'stock')
    text.push(`повернуто з ${items[0].location.name} ${new Date().toLocaleDateString()}.`)
  if (destinationLocation.locationType === 'location')
    text.push(`переміщено на ${destinationLocation.name} ${new Date().toLocaleDateString()}.`)

  return text.join(' ')

}