import dbConnect from '../../../utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import AWS from 'aws-sdk'
import { Item } from '../../../model/Item';


AWS.config.update({
  region: 'eu-central-1',
  signatureVersion: 'v4',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_MY_APP,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_MY_APP,

})

const s3 = new AWS.S3()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query,
  } = req

  await dbConnect()

  s3.deleteObject({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: query.key as string
  }, async function (err, data) {
    if (err) console.log(err, err.stack);
    else {
      const item = await Item.findByIdAndUpdate(query.id, { imageKey: undefined })
      res.status(200).json({ success: true, data })
    }
  })

}

