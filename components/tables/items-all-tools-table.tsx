import { useSession } from 'next-auth/client';
import React from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ItemDoc } from '../../model/Item';
import { RowAllToolsTable } from './row-all-tools-table';

interface Props {
  items: Array<ItemDoc>
}
export function ItemsAllToolsTable({ items }: Props) {
  const { showModal } = useActions()
  const [session, loading] = useSession();

  return (
    <div className='table-wrapper'>
      <div className='table-grid'>
        <div className='item header'>
          <span className='item-txt'>Назва</span>
        </div>
        <div className='sn header'>Серійний номер</div>
        <div className='location header'>Локація</div>
        <div className='responsible header'>Відп. особа</div>
        <div className='status header'>Статус</div>

        {items?.map(i => <RowAllToolsTable
          key={i._id}
          item={i}
          showModal={showModal}
          showEditButton={Boolean(session?.user)}
        />)
        }

      </div>

    </div>
  )
}