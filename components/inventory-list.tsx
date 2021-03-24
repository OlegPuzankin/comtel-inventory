import axios from 'axios';
import React from 'react';
import { ItemStatus, ItemType, MenuItem } from '../interfaces/common_interfaces';
import { Item, ItemDoc } from '../model/Item';
import { useGetItems, useGetLocations, useGetUsers } from '../hooks/swr';
import { RowLocationTable } from './row-location-table';
import { DropDown } from './ui/drop-down';
import { LocationDoc } from '../model/Location';
import { GearIcon } from './icons/gear-icon';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { EditButton } from './ui/edit-button';
import { ItemsLocationTable } from './items-location-table';
import { session, useSession } from 'next-auth/client';
import { mutate } from 'swr';
import { ItemsAllToolsTable } from './items-all-tools-table';
import { statusDic } from '../utils/statusDictionary';
import { ItemsStockTable } from './items-stock-table';



export function InventoryList() {
  const { data: locations } = useGetLocations()
  const { data: items, mutate: mutateItems } = useGetItems()
  const { showModal, clearSelectedItems } = useActions()
  const { location: selectedLocation, selectedItems } = useTypedSelector(state => state.main)
  const [session] = useSession();
  const { data: users } = useGetUsers()




  async function moveItems(selectedItems: Array<ItemDoc>, locationId: string) {
    const selectedItemsId = selectedItems.map(i => i._id)
    await axios.put('/api/item/move', { selectedItemsId, locationId })
    // mutate('/api/item')
    mutateItems()
    clearSelectedItems()
  }

  function moveMenuItems(): Array<MenuItem> {
    return locations?.data.map(l => {
      return {
        id: l._id,
        menuItemText: l.name,
        clickHandler: () => moveItems(selectedItems, l._id)
      }
    })
  }
  function addNewMenuItems(): Array<MenuItem> {
    return [
      { id: "1", menuItemText: 'Add location', clickHandler: () => showModal('location') },
      { id: "2", menuItemText: 'Add item', clickHandler: () => showModal('item') },
    ]
  }
  function changeStatusMenuItems(): Array<MenuItem> {

    const statuses = [ItemStatus.OnLocation, ItemStatus.Pending, ItemStatus.OnStock]

    async function changeStatus(status: string) {
      const selectedItemsId = selectedItems.map(si => si._id)
      await axios.put(`/api/item/status`, { selectedItemsId, status })
      mutate('/api/item')
    }

    return statuses.map((status, id) => {
      return {
        id: id.toString(),
        menuItemText: statusDic[status],
        clickHandler: changeStatus.bind(null, status)
      }
    })
  }
  function changeResponsibleMenuItems(): Array<MenuItem> {

    async function changeResponsiblePerson(responsibleUserId: string) {
      const selectedItemsId = selectedItems.map(si => si._id)
      await axios.put(`/api/item/responsible`, { responsibleUserId, selectedItemsId })
      mutate('/api/item')

    }

    return users?.data.map((user) => {
      return {
        id: user._id,
        menuItemText: user.name,
        clickHandler: () => changeResponsiblePerson(user._id)
      }
    })
  }

  function filterItemsByLocation() {

    if (!selectedLocation)
      return items?.data.filter(i => {
        if (i.type === ItemType.Tool)
          return i
      })

    return items?.data
      .filter(item => {
        return item.location._id === selectedLocation._id
      })
  }
  function showMoveButton() {
    //@ts-ignore
    if (selectedItems.length > 0 && session?.user.admin) {
      return true
    }
    else {
      return selectedLocation?.locationType === 'stock' && selectedItems.length > 0
    }
  }
  function showEditLocationButton() {
    if (!session)
      return false
    else if (!selectedLocation)
      return false
    else
      return true
  }

  function showChangeStatusOrResponsible() {
    //@ts-ignore
    if (selectedItems.length > 0 && session?.user.admin)
      return true
    else
      return false
  }
  function getLocatioName() {
    if (!selectedLocation)
      return 'All tools'
    else
      return `${selectedLocation?.locationType}: ${selectedLocation?.name}`
  }

  return (
    <div className='inventory-list'>
      <div className='inventory-list-top-row'>


        <span className='current-location'>{getLocatioName()}</span>
        {showEditLocationButton() &&
          <div className='edit-location-btn' onClick={() => showModal('edit-location')}>
            <EditButton />
          </div>
        }
        {showMoveButton() &&
          <div className='move-btn'>
            <DropDown buttonText='Move to' menuItems={moveMenuItems()} />
          </div>
        }
        {showChangeStatusOrResponsible() &&
          // <div
          //   onClick={() => showModal('change-responsible')}
          // className='btn btn-navy'>responsible</div>
          <DropDown buttonText='Responsible' menuItems={changeResponsibleMenuItems()} />
        }


        {showChangeStatusOrResponsible() &&
          <DropDown buttonText='Status' menuItems={changeStatusMenuItems()} />
        }

        {session && <div className='add-new-btn'>
          <DropDown
            buttonText='Add new'
            menuItems={addNewMenuItems()}
          />
        </div>}


      </div>

      {selectedLocation?.locationType === 'location' && <ItemsLocationTable items={filterItemsByLocation()} />}
      {selectedLocation?.locationType === 'stock' && <ItemsStockTable items={filterItemsByLocation()} />}
      {!selectedLocation && <ItemsAllToolsTable items={filterItemsByLocation()} />}

    </div>

  )
}