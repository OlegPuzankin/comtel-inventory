import React from 'react';
import { ItemDoc } from '../model/Item';
import { FileIcon } from './icons/file-icon';
import cn from 'classnames'
import { useRouter } from 'next/router'
import { CheckBox } from './ui/check-box';
import { useSession } from 'next-auth/client';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { statusDic } from '../utils/statusDictionary';
import { ItemImagePreview } from './item-image-preview';
import { getItemText } from '../utils/getItemText';



// const statusDic = {
//   pending: 'Очікує видачі',
//   onLocation: 'Видано',
//   onStock: "Склад"
// }

interface Props {
  item: ItemDoc,
  showModal: Function
  // handleCheckBox: (selected: boolean, item: ItemDoc) => void
}

export function RowAllToolsTable({ item, showModal }: Props) {

  const [session, loading] = useSession();
  const selectedLocation = useTypedSelector(state => state.main.location)
  const router = useRouter()

  function navigateToEditPage() {
    router.push(`/item/${item._id}`)
  }


  function getStatusText() {
    if (item.location.locationType === 'stock')
      return 'Cклад'
    else if (item.location.locationType === 'location')
      return statusDic[item.status]
  }


  return (
    <>
      <div className='row item'>
        {
          item.imageKey
            ? <ItemImagePreview showModal={showModal} imageKey={item.imageKey} />
            : <div className='item-img' >
              <FileIcon cssClassName='file-icon' />
            </div>
        }

        <span className='item-txt'>
          {getItemText(item)}
          <div className='edit-btn'>
            <button className='btn btn-navy' onClick={navigateToEditPage}>Edit</button>
          </div>
        </span>

      </div>

      <div className='row sn'>{item.serialNumber} </div>
      <div className='row location'>
        <span className='txt'>{item.location.name}</span>
      </div>

      <div className='row responsible'>{item.location.locationType === 'location' && item.responsiblePerson?.name}</div>
      <div className='row status'>{getStatusText()}</div>
    </>
  )
}