import { NextApiRequest, NextApiResponse } from 'next'
import AWS from 'aws-sdk'
import { v4 as uuidv4, v4 } from 'uuid';


AWS.config.update({
  region: 'eu-central-1',
  signatureVersion: 'v4',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_MY_APP,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_MY_APP,

})

const s3 = new AWS.S3({

})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query
  } = req

  //@ts-ignore
  const key = `${uuidv4()}.${query.type.split('/')[1]}`

  s3.deleteObject({
    Bucket: 'comtel-inventory',
    Key: '09333cf2-fb43-404a-b596-71fdca98bca5.png'
  }, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else (data);           // successful response
    /*
    data = {
    }
    */
  })

  s3.getSignedUrl('putObject', {
    Bucket: 'comtel-inventory',
    Key: key,
    ContentType: query.type || 'image/jpeg'
  }, (err, url) => res.status(200).json({ key, url }))
}

