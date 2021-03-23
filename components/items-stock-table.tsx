import { useSession } from 'next-auth/client';
import React from 'react';
import { useActions } from '../hooks/useActions';
import { useCheckBox } from '../hooks/useCheckbox';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ItemDoc } from '../model/Item';
import { RowStockTable } from './row-stock-table';

interface Props {
  items: Array<ItemDoc>
}
export function ItemsStockTable({ items }: Props) {
  const selectedItems = useTypedSelector(state => state.main.selectedItems)
  const { selectItem, deselectItem } = useActions()
  const { checked, toggleCheckbox } = useCheckBox(items)
  const [session, loading] = useSession();



  function handleCheckBox(selected: boolean, item: ItemDoc) {
    if (!selected) {
      selectItem(item)
    } else
      deselectItem(item)
  }

  function showCheckBox() {
    if (!session)
      return false
    else
      return true
  }

  const memoShowCheckBox = React.useMemo(showCheckBox, [session])

  if (items.length === 0)
    return <h1>No items</h1>



  return (
    <div className='items-table'>
      <div className='header'>
        <div className='item flex-60'>
          {memoShowCheckBox && <div className='checkbox'>
            <input
              type='checkbox'
              checked={checked}
              onChange={toggleCheckbox} />
          </div>}
          <span className='ml-1'>Name</span>
        </div>

        <div className='flex-20'>Serial number</div>
        <div className='flex-20'>Date</div>


      </div>
      {items?.map(i => <RowStockTable
        key={i._id}
        item={i}
        showCheckBox={memoShowCheckBox}
        handleCheckBox={handleCheckBox}
        selected={selectedItems?.some(si => si._id === i._id)} />)}
    </div>
  )
}