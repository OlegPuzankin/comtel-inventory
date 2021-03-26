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

export function RowLocationTable({ item, selected, handleCheckBox, showCheckBox }: Props) {
  const router = useRouter()

  function navigateToEditPage() {
    router.push(`/item/${item._id}`)
  }


  return (
    <div className={cn('row', { 'selected': selected })}>

      <div className='item flex-40' onClick={navigateToEditPage}>
        {showCheckBox &&
          <div className='checkbox'>
            <input type='checkbox' checked={selected} onChange={() => handleCheckBox(selected, item)} />
          </div>
        }

        {
          item.imageKey
            ? <div className='item-img' style={{ backgroundImage: `url(${AWS_URL}/${item.imageKey})` }} />
            : <div className='item-img' >
              <FileIcon cssClassName='file-icon' />
            </div>
        }

        <span className='item-txt'>
          {item.name}
        </span>

      </div>


      <div className='flex-20'>{item.responsiblePerson?.name}</div>
      <div className='flex-20'>{statusDic[item.status]}</div>
      <div className='flex-20'>{new Date(item.timestamp).toLocaleDateString('en-GB')}</div>
    </div>

  )
}
