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
      <div className='table-grid'>
        <div className='item header'>
          <span className='item-txt'>Name</span>
        </div>
        <div className='sn header'>Ser number</div>
        <div className='location header'>Location</div>
        <div className='responsible header'>Responsible</div>
        <div className='status header'>Status</div>

        {items?.map(i => <RowAllToolsTable
          key={i._id}
          item={i}
          showModal={showModal}
        />)
        }

      </div>

    </div>
  )
}