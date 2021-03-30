import React from 'react';
import cn from 'classnames'
import { useTypedSelector } from '../hooks/useTypedSelector';

interface Props {
  show: boolean,
  close: Function,
}



export function ModalItemImage({ show, close }: Props) {
  // const [loading, setLoading] = React.useState(false)
  const { window } = useTypedSelector(state => state.ui)

  const imageKey = window?.slice(11)
  if (!imageKey)
    return null

  return (
    <div className={cn('modal-backdrop', { 'modal-backdrop--visible': show })}>
      <div className={cn('modal', { 'modal--visible': show })}>
        <div className='image-wrapper'>
          <div className='modal-item-image' style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/${imageKey})` }}>
            <div className='close-icon' onClick={() => close()}>&#10006;</div>
          </div>
        </div>

      </div>

      {/* {loading && <div className='container'>
        <Loader />
      </div>} */}
    </div>
  )
}