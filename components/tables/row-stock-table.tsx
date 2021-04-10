import React from 'react';
import { ItemDoc } from '../../model/Item';
import { FileIcon } from '../icons/file-icon';
import cn from 'classnames'
import { useRouter } from 'next/router'
import { ItemImagePreview } from '../item-image-preview';
import { getItemText } from '../../utils/getItemText';
import { df } from '../../utils/dateFormat';
// import dateFormat from 'dateformat'



interface Props {
  item: ItemDoc,
  selected: boolean,
  handleCheckBox: (selected: boolean, item: ItemDoc) => void
  showCheckBox: boolean,
  showModal: Function,
  showEditButton: boolean
}

export function RowStockTable({ item, selected, handleCheckBox, showCheckBox, showModal, showEditButton }: Props) {

  const router = useRouter()

  function navigateToEditPage() {
    router.push(`/item/${item._id}`)
  }


  return (
    <>
      <div className={cn('row item grid-col-3', { 'selected': selected })}>
        {showCheckBox &&
          <div className='checkbox'>
            <input
              type='checkbox'
              checked={selected}
              onChange={() => handleCheckBox(selected, item)} />
          </div>
        }

        {
          item.imageKey
            ? <ItemImagePreview showModal={showModal} imageKey={item.imageKey} />
            : <div className='item-img' >
              <div className="file-icon">
                <FileIcon />
              </div>
            </div>
        }

        <span className='item-txt'>
          {getItemText(item)}
          {!selected && showEditButton && <div className='edit-btn'>
            <button className='btn btn-navy' onClick={navigateToEditPage}>Edit</button>
          </div>}
        </span>
      </div>

      <div className={cn('row sn', { 'selected': selected })}>{item.serialNumber} </div>
      <div className={cn('row date', { 'selected': selected })}>
        {df(new Date(item.timestamp), "mediumDate")}
      </div>
    </>
  )
}

// style = {{ backgroundImage: `url(${imageUrl})` }}