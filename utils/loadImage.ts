import axios from 'axios';
import { GetPresignURLResponse } from '../interfaces/api_response';

export async function loadImage(image: File) {

  const uploadConfig = await axios.get<GetPresignURLResponse>(`/api/aws-s3/upload?type=${image.type}`)
  try {
    const response = await axios.put(uploadConfig.data.url, image, {
      headers: {
        'Content-Type': image.type,
      }
    })
    return {
      status: response.status,
      key: uploadConfig.data.key
    }

  } catch (e) {
    console.log(e);
  }

}