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
  // handleCheckBox: (selected: boolean, item: ItemDoc) => void
}
const AWS_URL = 'https://comtel-inventory.s3.eu-central-1.amazonaws.com'

export function RowAllToolsTable({ item }: Props) {

  const [session, loading] = useSession();
  const selectedLocation = useTypedSelector(state => state.main.location)


  const router = useRouter()

  function renderIcon() {

    if (item.imageKey) {
      return (
        <div className='item-img' style={{ backgroundImage: `url(${AWS_URL}/${item.imageKey})` }}>
        </div>
      )
    } else {
      return (
        <div className='item-img' >
          <FileIcon cssClassName='file-icon' />
        </div>
      )
    }
  }

  function navigateToEditPage() {
    router.push(`/item/${item._id}`)
  }

  function showCheckBox() {

    if (selectedLocation?.locationType === 'stock')
      return true
    //@ts-ignore
    else if (selectedLocation?.locationType === 'location' && session?.user.admin)
      return true

    return false
  }

  function getStatusText() {
    if (item.location.locationType === 'stock')
      return 'Cклад'
    else if (item.location.locationType === 'location')
      return statusDic[item.status]
  }


  return (
    <div className={cn('row ')}>

      <div className='item flex-30'>


        {/* {item.imageKey &&
          <div className='item-img' style={{ backgroundImage: `url(${AWS_URL}/${item.imageKey})` }} />
          // : <div className='item-img' >
          //   <FileIcon cssClassName='file-icon' />
          // </div>
        } */}

        <span onClick={navigateToEditPage} className='item-txt'>
          {item.name} {item.quantity > 1 && item.quantity}
        </span>

      </div>

      <div className='flex-20'>{item.serialNumber} </div>
      <div className='flex-20'>{item.location.name} </div>

      <div className='flex-15'>{item.location.locationType === 'location' && item.responsiblePerson?.name}</div>
      <div className='flex-15'>{getStatusText()}</div>
    </div>

  )
}

// style = {{ backgroundImage: `url(${imageUrl})` }}