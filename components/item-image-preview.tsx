import { AWS_URL } from '../utils/const_variables';

export function ItemImagePreview({ showModal, imageKey }) {
  return (
    <div
      className='item-img'
      onClick={() => showModal(`show-image-${imageKey}`)}
      style={{ backgroundImage: `url(${AWS_URL}/${imageKey})` }} />
  )
}