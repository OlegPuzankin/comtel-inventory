import React from 'react';
import { ItemDoc } from '../model/Item';
import { FileIcon } from './icons/file-icon';
import cn from 'classnames'
import { useRouter } from 'next/router'
import { statusDic } from '../utils/statusDictionary';
import { ItemImagePreview } from './item-image-preview';



// const statusDic = {
//   pending: 'Очікує видачі',
//   onLocation: 'Видано',
//   onStock: "Склад"
// }

interface Props {
  item: ItemDoc,
  selected: boolean,
  handleCheckBox: (selected: boolean, item: ItemDoc) => void
  showCheckBox: boolean,
  showModal: Function
}

export function RowLocationTable({ item, selected, handleCheckBox, showCheckBox, showModal }: Props) {
  const router = useRouter()

  function navigateToEditPage() {
    router.push(`/item/${item._id}`)
  }


  return (
    <div className={cn('table table-row', { 'selected': selected })}>

      <div className='item grid-col-2' >
        {showCheckBox &&
          <div className='checkbox'>
            <input type='checkbox' checked={selected} onChange={() => handleCheckBox(selected, item)} />
          </div>
        }

        {
          item.imageKey
            ? <ItemImagePreview showModal={showModal} imageKey={item.imageKey} />
            : <div className='item-img' >
              <FileIcon cssClassName='file-icon' />
            </div>
        }

        <span className='item-txt' >
          {item.name}
          <div className='edit-btn'>
            <button className='btn btn-navy' onClick={navigateToEditPage}>Edit</button>
          </div>
        </span>
      </div>

      <div className='responsible'>{item.responsiblePerson?.name}</div>
      <div className='status'>{statusDic[item.status]}</div>
      <div className='date'>{new Date(item.timestamp).toLocaleDateString('en-GB')}</div>
    </div>

  )
}
