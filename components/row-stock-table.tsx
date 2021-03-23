import React from 'react';
import { ItemDoc } from '../model/Item';
import { FileIcon } from './icons/file-icon';
import cn from 'classnames'
import { useRouter } from 'next/router'
import { CheckBox } from './ui/check-box';
import { useSession } from 'next-auth/client';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { statusDic } from '../utils/statusDictionary';



// const statusDic = {
//   pending: 'Очікує видачі',
//   onLocation: 'Видано',
//   onStock: "Склад"
// }

interface Props {
  item: ItemDoc,
  selected: boolean,
  handleCheckBox: (selected: boolean, item: ItemDoc) => void
  showCheckBox: boolean
}
const AWS_URL = 'https://comtel-inventory.s3.eu-central-1.amazonaws.com'

export function RowStockTable({ item, selected, handleCheckBox, showCheckBox }: Props) {

  const router = useRouter()

  function navigateToEditPage() {
    router.push(`/item/${item._id}`)
  }
  function getItemText() {
    const arrText = [item.name]
    if (item.desc)
      arrText.push(item.desc)
    else if (item.quantity > 1)
      arrText.push(`${item.quantity} ${item.measure}`)
    return arrText.join(', ')
  }

  return (
    <div className={cn('row', { 'selected': selected })}>

      <div className='item flex-60'>
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
            ? <div className='item-img' style={{ backgroundImage: `url(${AWS_URL}/${item.imageKey})` }} />
            : <div className='item-img' >
              <FileIcon cssClassName='file-icon' />
            </div>
        }

        <span onClick={navigateToEditPage} className='item-txt'>
          {getItemText()}
        </span>

      </div>

      <div className='flex-20'>{item.serialNumber} </div>
      <div className='flex-20'>
        {new Date(item.timestamp).toLocaleDateString('en-GB')}
      </div>

    </div>

  )
}

// style = {{ backgroundImage: `url(${imageUrl})` }}