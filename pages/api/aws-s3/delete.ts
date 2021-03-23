import dbConnect from '../../../utils/dbConnect'
import { Location } from '../../../model/Location'
import { NextApiRequest, NextApiResponse } from 'next'
import AWS from 'aws-sdk'
import { v4 as uuidv4, v4 } from 'uuid';
import { getSession } from 'next-auth/client';
import { Item } from '../../../model/Item';

const s3 = new AWS.S3(
  {
    // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    // secretAccessKey: process.env.AWS_SECRET_KEY,
    signatureVersion: 'v4',
    region: 'eu-central-1'
  }
)





export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query,
  } = req

  console.log(query)
  await dbConnect()

  s3.deleteObject({
    Bucket: 'comtel-inventory',
    Key: query.key as string
  }, async function (err, data) {
    if (err) console.log(err, err.stack);
    else {

      const item = await Item.findByIdAndUpdate(query.id, { imageKey: undefined })


      res.status(200).json({ success: true, data })
    }
  })

}

