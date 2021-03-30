import { NextApiRequest, NextApiResponse } from 'next'
import AWS from 'aws-sdk'
import { v4 as uuidv4, v4 } from 'uuid';


AWS.config.update({
  region: 'eu-central-1',
  signatureVersion: 'v4',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_MY_APP,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_MY_APP,

})

const s3 = new AWS.S3()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query
  } = req

  //@ts-ignore
  const key = `${uuidv4()}.${query.type.split('/')[1]}`


  s3.getSignedUrl('putObject', {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    ContentType: query.type || 'image/jpeg'
  }, (err, url) => res.status(200).json({ key, url }))
}

