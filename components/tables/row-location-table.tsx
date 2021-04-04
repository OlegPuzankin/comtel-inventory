import React from 'react';
import cn from 'classnames'
import { useRouter } from 'next/router'
import { ItemDoc } from '../../model/Item';
import { ItemImagePreview } from '../item-image-preview';
import { FileIcon } from '../icons/file-icon';
import { statusDic } from '../../utils/statusDictionary';


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
    <>
      <div className={cn('row item grid-col-2', { 'selected': selected })} >
        {showCheckBox &&
          <div className='checkbox'>
            <input type='checkbox' checked={selected} onChange={() => handleCheckBox(selected, item)} />
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

        <span className='item-txt' >
          {item.name}
          {!selected && <div className='edit-btn'>
            <button className='btn btn-navy' onClick={navigateToEditPage}>Edit</button>
          </div>}
        </span>
      </div>

      <div className={cn('row responsible', { 'selected': selected })}>{item.responsiblePerson?.name}</div>
      <div className={cn('row status', { 'selected': selected })}>{statusDic[item.status]}</div>
      <div className={cn('row date', { 'selected': selected })}>{new Date(item.timestamp).toLocaleDateString('en-GB')}</div>
    </>

  )
}
