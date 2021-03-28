import { ItemDoc } from './../../../model/Item';
import { HistoryDoc } from './../../../model/History';
// import { ItemStatus } from '../../../model/Item';
import { History } from './../../../model/History';
import { Location, LocationDoc } from './../../../model/Location';
import dbConnect from '../../../utils/dbConnect'
import { Item } from '../../../model/Item'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client';
import { User, UserDoc } from '../../../model/User';
import { ItemStatus, LocationType } from '../../../interfaces/common_interfaces';
import sgMail from '@sendgrid/mail'



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req

  await dbConnect()


  try {
    const { user } = await getSession({ req })
    const _user = await User.findOne({ email: user.email })
    const items = await Item.find({ '_id': { $in: body.selectedItemsId } }).populate('location')
    const destinationLocation = await Location.findById(body.locationId)
    // console.log('dest loc type', destinationLocation.locationType);

    // creare history record
    const history = new History({
      date: new Date(),
      user: _user,
      description: await getMoveHistoryDescription(items, destinationLocation, _user)
    })
    // update items
    const data = await Item.updateMany(
      { '_id': { $in: body.selectedItemsId } },
      {
        location: body.locationId,
        responsiblePerson: _user,
        status: ItemStatus.Pending,
        timestamp: new Date()
      });

    await history.save()
    // sending email to admin
    // try {
    //   if (destinationLocation.locationType === LocationType.Location)
    //     await sendEmail(items, _user, destinationLocation)
    // } catch (e) {
    //   console.error(e);
    // }

    res.status(200).json({ success: true, data })
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false })
  }
}


async function getMoveHistoryDescription(items: Array<ItemDoc>, destinationLocation: LocationDoc, user: UserDoc) {
  // const items = await Item.find({ '_id': { $in: itemsId } }).populate('location')
  // const destinationLocation = await Location.findById(locationId)
  const text = ['Iнструмент ']
  text[1] = items.map(i => {
    return `${i.name}`
  }).join(', ')

  text.push(`переміщено: ${items[0].location.name}=>${destinationLocation.name} ${new Date().toLocaleDateString()}.`)
  text.push(`by ${user.name}`)

  // if (destinationLocation.locationType === 'stock') {
  //   text.push(`повернуто з ${items[0].location.name} на ${destinationLocation.name} ${new Date().toLocaleDateString()}.`)
  // }
  // if (destinationLocation.locationType === 'location')
  //   text.push(`переміщено на ${destinationLocation.name} ${new Date().toLocaleDateString()}.`)

  return text.join(' ')

}

function sendEmail(items: Array<ItemDoc>, user: UserDoc, location: LocationDoc) {
  sgMail.setApiKey(process.env.SEND_GRID_KEY)

  const msg = {
    to: 'olegp@comtel.ua',
    from: 'oleg.puzankin@gmail.com',
    subject: `Заявка на отримання інструмента, ${new Date().toLocaleDateString()}`,
    html:
      `<h3>Місце інсталляції - ${location.name}</h3>
        <p>Перелік інстурмента</>
        <ul>
          ${items.map(i => {
        return `<li>${i.name}</li>`
      })}
        </ul
    `
  }

  return sgMail.send(msg)

}