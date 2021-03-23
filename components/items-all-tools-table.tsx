import React from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ItemDoc } from '../model/Item';
import { RowAllToolsTable } from './row-all-tools-table';

interface Props {
  items: Array<ItemDoc>
}
export function ItemsAllToolsTable({ items }: Props) {

  return (
    <div className='items-table'>
      <div className='header'>
        <div className='item flex-30'>
          <span className='ml-1'> Name</span>
        </div>
        <div className='flex-20'>Serial number</div>
        <div className='flex-20'>Location</div>
        <div className='flex-15'>Responsible</div>
        <div className='flex-15'>Status</div>

      </div>
      {items?.map(i => <RowAllToolsTable
        key={i._id}
        item={i}
      />)
      }
    </div>
  )
}