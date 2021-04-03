import React from 'react'
import { useGetHistory, useGetItems, useGetLocations } from '../hooks/swr'
import { LocationItem } from './location-item'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import cn from 'classnames'
import { getCountItems } from '../utils/getCountItems'
import { LocationType } from '../interfaces/common_interfaces'
import Link from 'next/link'

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

      <div
        onClick={() => setLocation(null)}
        className={cn('all-items', { 'all-items-selected': !selectedLocation })}>
        {/* <div className='open-folder-icon'>
          <OpenFolderIcon />
        </div> */}
        <span>All tools</span>
      </div>

      <div className='location-list-entries'>
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

      <Link href="/history">
        <a className="link-history-page">
          History
          </a>
      </Link>
    </div>
  )
}