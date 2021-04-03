import React from 'react';
import cn from 'classnames'
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';


export function ModalItemImage() {
  const { window } = useTypedSelector(state => state.ui)
  const { closeModal } = useActions()


  const imageKey = window?.slice(11)
  if (!imageKey)
    return null

  return (
    <div className='modal-backdrop'>
      <div className='modal'>
        <div className='image-wrapper'>
          <div className='modal-item-image' style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/${imageKey})` }}>
            <div className='close-icon' onClick={() => closeModal()}>&#10006;</div>
          </div>
        </div>
      </div>
    </div>
  )
}