import axios from 'axios';
import React from 'react';
import { ItemStatus, ItemType, LocationType, MenuItem } from '../interfaces/common_interfaces';
import { ItemDoc } from '../model/Item';
import { useGetItems, useGetLocations, useGetUsers } from '../hooks/swr';
import { DropDown } from './ui/drop-down';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { EditButton } from './ui/edit-button';
import { ItemsLocationTable } from './tables/items-location-table';
import { useSession } from 'next-auth/client';
import { mutate } from 'swr';
import { ItemsAllToolsTable } from './tables/items-all-tools-table';
import { statusDic } from '../utils/statusDictionary';
import { ItemsStockTable } from './tables/items-stock-table';
import { Loader } from './loader';
import { TextInput } from './ui/text-input';



export function InventoryList() {
  const { data: locations } = useGetLocations()
  const { data: items, mutate: mutateItems } = useGetItems()
  const { data: users } = useGetUsers()

  const { showModal, clearSelectedItems } = useActions()
  const { location: selectedLocation, selectedItems } = useTypedSelector(state => state.main)
  const [session] = useSession();
  const [loading, setLoading] = React.useState(false)

  const [searchString, setSearchString] = React.useState('')


  async function moveItems(selectedItems: Array<ItemDoc>, locationId: string) {
    setLoading(true)
    const selectedItemsId = selectedItems.map(i => i._id)
    try {
      await axios.put('/api/item/move', { selectedItemsId, locationId })
      mutateItems()
      clearSelectedItems()
      setLoading(false)
    } catch (e) {
      console.log(e);
      setLoading(false)
    }

  }

  function moveMenuItems(): Array<MenuItem> {
    return locations?.data.filter(l => l._id !== selectedLocation._id).map(l => {
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

    const statuses = [ItemStatus.OnLocation, ItemStatus.Pending]

    async function changeStatus(status: string) {
      setLoading(true)
      try {
        const selectedItemsId = selectedItems.map(si => si._id)
        await axios.put(`/api/item/status`, { selectedItemsId, status })
        mutate('/api/item')
        setLoading(false)
      } catch (e) {
        console.log(e);
        setLoading(false)
      }
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
      setLoading(true)
      try {
        const selectedItemsId = selectedItems.map(si => si._id)
        await axios.put(`/api/item/responsible`, { responsibleUserId, selectedItemsId })
        mutate('/api/item')
        setLoading(false)
      } catch (e) {
        console.log(e);
        setLoading(false)
      }
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
      .filter(item => {
        return (
          item.name.toLowerCase().includes(searchString.toLowerCase())
        )
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
    else if (selectedLocation.locationType === LocationType.Stock)
      return false
    else
      return true
  }

  function showChangeStatusOrResponsible() {
    if (selectedLocation?.locationType === LocationType.Stock)
      return false
    //@ts-ignore
    else if (selectedItems.length > 0 && session?.user.admin)
      return true
    else
      return false
  }
  function getLocatioName() {
    if (!selectedLocation)
      return 'Всі інструменти'
    else
      return `${selectedLocation?.name}`
    // return `${selectedLocation?.locationType}: ${selectedLocation?.name}`
  }

  React.useEffect(() => {
    filterItemsByLocation()
  }, [searchString])


  return (
    <div className='inventory-list'>
      <div className='inventory-list-top-row'>

        {showEditLocationButton() &&
          <div className='edit-location-btn' onClick={() => showModal('edit-location')}>
            <EditButton />
          </div>
        }
        <span className='current-location'>{getLocatioName()}</span>

        {showMoveButton() &&
          <div className='move-btn'>
            <DropDown buttonText='Move to' menuItems={moveMenuItems()} />
          </div>
        }
        {showChangeStatusOrResponsible() &&
          <DropDown buttonText='Responsible' menuItems={changeResponsibleMenuItems()} />
        }


        {showChangeStatusOrResponsible() &&
          <DropDown buttonText='Status' menuItems={changeStatusMenuItems()} />
        }

        {session && <div className='add-new-btn'>
          <DropDown
            menuRight={true}
            buttonText='Add new'
            menuItems={addNewMenuItems()}
          />
        </div>}


      </div>

      {selectedLocation &&
        <div className='search'>
          <TextInput
            label={`find by name`}
            inputProps={{
              onChange: e => setSearchString(e.target.value),
              value: searchString,
            }} />
        </div>
      }

      {selectedLocation?.locationType === 'location' && <ItemsLocationTable items={filterItemsByLocation()} />}
      {selectedLocation?.locationType === 'stock' && <ItemsStockTable items={filterItemsByLocation()} />}
      {!selectedLocation && <ItemsAllToolsTable items={filterItemsByLocation()} />}


      {loading && <div className='loader-container'>
        <Loader />
      </div>}

    </div>
  )
}