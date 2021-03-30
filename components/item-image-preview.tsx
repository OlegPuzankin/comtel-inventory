export function ItemImagePreview({ showModal, imageKey }) {
  return (
    <div
      className='item-img'
      onClick={() => showModal(`show-image-${imageKey}`)}
      style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/${imageKey})` }} />
  )
}