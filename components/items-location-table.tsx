import { useSession } from 'next-auth/client';
import React from 'react';
import { useActions } from '../hooks/useActions';
import { useCheckBox } from '../hooks/useCheckbox';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ItemDoc } from '../model/Item';
import { RowLocationTable } from './row-location-table';

interface Props {
  items: Array<ItemDoc>
}


export function ItemsLocationTable({ items }: Props) {
  const selectedItems = useTypedSelector(state => state.main.selectedItems)
  const { selectItem, deselectItem, showModal } = useActions()
  const { checked, toggleCheckbox } = useCheckBox(items)
  const [session, loading] = useSession();


  function showCheckBox() {
    //@ts-ignore
    if (session?.user.admin)
      return true
    else
      return false
  }

  const memoShowCheckBox = React.useMemo(showCheckBox, [session])

  function handleItemCheckbox(selected: boolean, item: ItemDoc) {
    if (!selected) {
      selectItem(item)
    } else
      deselectItem(item)
  }

  if (items.length === 0)
    return <h1>No items</h1>



  return (
    <div className='table-wrapper'>
      <div className='table table-header'>
        <div className='item'>
          {
            memoShowCheckBox &&
            <div className='checkbox'>
              <input
                type='checkbox'
                checked={checked}
                onChange={toggleCheckbox} />
            </div>
          }
          <span className='item-txt'>Name</span>

        </div>
        {/* <div className='sn flex-20'>Serial number</div> */}
        <div className='responsible'>Responsible</div>
        <div className='status'>Status</div>
        <div className='date'>Date</div>
      </div>
      {items?.map(i => <RowLocationTable
        key={i._id}
        item={i}
        showCheckBox={memoShowCheckBox}
        handleCheckBox={handleItemCheckbox}
        showModal={showModal}
        selected={selectedItems?.some(si => si._id === i._id)} />)
      }
    </div>
  )
}