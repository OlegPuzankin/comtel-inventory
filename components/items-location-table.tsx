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
  const { selectItem, deselectItem } = useActions()
  const { checked, toggleCheckbox } = useCheckBox(items)
  const [session, loading] = useSession();


  function showCheckBox() {
    if (!session?.user.admin)
      return false
    else
      return true
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
    <div className='items-table'>
      <div className='header'>
        <div className='item flex-40'>
          {
            memoShowCheckBox &&
            <div className='checkbox'>
              <input
                type='checkbox'
                checked={checked}
                onChange={toggleCheckbox} />
            </div>
          }
          <span className='ml-1'>Name</span>

        </div>
        {/* <div className='sn flex-20'>Serial number</div> */}
        <div className='responsible flex-20'>Responsible</div>
        <div className='status flex-20'>Status</div>
        <div className='status flex-20'>Date</div>
      </div>
      {items?.map(i => <RowLocationTable
        key={i._id}
        item={i}
        showCheckBox={memoShowCheckBox}
        handleCheckBox={handleItemCheckbox}
        selected={selectedItems?.some(si => si._id === i._id)} />)
      }
    </div>
  )
}