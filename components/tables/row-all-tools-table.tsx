import React from 'react';
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ItemDoc } from '../../model/Item';
import { getItemText } from '../../utils/getItemText';
import { statusDic } from '../../utils/statusDictionary';
import { FileIcon } from '../icons/file-icon';
import { ItemImagePreview } from '../item-image-preview';



interface Props {
  item: ItemDoc,
  showModal: Function,
  showEditButton: Boolean
}

export function RowAllToolsTable({ item, showModal, showEditButton }: Props) {

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
              <div className="file-icon">
                <FileIcon />
              </div>
            </div>
        }

        <span className='item-txt'>
          {getItemText(item)}
          {showEditButton && <div className='edit-btn'>
            <button className='btn btn-navy' onClick={navigateToEditPage}>Edit</button>
          </div>}
        </span>

      </div>

      <div className='row sn'>{item.serialNumber} </div>
      <div className='row location'>
        <span className='txt'>{item.location.name}</span>
      </div>

      <div className='row responsible'>
        <span className="txt">{item.location.locationType === 'location' && item.responsiblePerson?.name}</span>
      </div>

      <div className='row status'>{getStatusText()}</div>
    </>
  )
}