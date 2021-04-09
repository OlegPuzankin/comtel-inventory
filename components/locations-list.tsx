import React from 'react'
import { useGetHistory, useGetItems, useGetLocations } from '../hooks/swr'
import { LocationItem } from './location-item'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import cn from 'classnames'
import { getCountItems } from '../utils/getCountItems'
import { ItemType, LocationType } from '../interfaces/common_interfaces'
import Link from 'next/link'
import { HistoryIcon } from './icons/history-icon'

// interface Location extends LocationDoc {
//   countItems: number
// }

export function LocationsList() {

  const { setLocation } = useActions()
  const { data: locations } = useGetLocations()
  const { data: items } = useGetItems()
  const selectedLocation = useTypedSelector(state => state.main.location)



  return (
    <div className='location-list'>



      <div className='location-list-entries'>
        <div
          onClick={() => setLocation(null)}
          className={cn('all-tools location-item', { 'location-item-selected': !selectedLocation })}>
          <span>Всі інструменти</span>
          <span className='countItems'>{items?.data.filter(i => i.type === ItemType.Tool).length}</span>
        </div>

        {locations?.data.map(location => {
          return <LocationItem
            key={location._id}
            location={location}
            setLocation={setLocation}
            countItems={getCountItems(location._id, items?.data)}
            isSelected={location._id === selectedLocation?._id}
          />
        })}

      </div>
      <hr />

      <div className='history'>
        <div className='history-icon'>
          <HistoryIcon />
        </div>
        <Link href="/history">
          <a className="history-link">
            history
          </a>
        </Link>
      </div>


    </div>
  )
}