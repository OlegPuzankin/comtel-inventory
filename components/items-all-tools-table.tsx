import React from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ItemDoc } from '../model/Item';
import { RowAllToolsTable } from './row-all-tools-table';

interface Props {
  items: Array<ItemDoc>
}
export function ItemsAllToolsTable({ items }: Props) {
  const { showModal } = useActions()

  return (
    <div className='table-wrapper'>
      <div className='table table-header'>
        <div className='item'>
          <span className='item-txt'>Name</span>
        </div>
        <div className='sn'>Serial number</div>
        <div className='location'>Location</div>
        <div className='responsible'>Responsible</div>
        <div className='status'>Status</div>

      </div>
      {items?.map(i => <RowAllToolsTable
        key={i._id}
        item={i}
        showModal={showModal}
      />)
      }
    </div>
  )
}