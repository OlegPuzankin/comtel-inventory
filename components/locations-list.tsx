import React from 'react'
import { LocationDoc } from '../model/Location'
import { useGetItems, useGetLocations } from '../hooks/swr'
import { OpenFolderIcon } from './icons/open-folder'
import { LocationItem } from './location-item'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import cn from 'classnames'
import { getCountItems } from '../utils/getCountItems'

// interface Location extends LocationDoc {
//   countItems: number
// }

export function LocationsList() {

  const { setLocation } = useActions()

  const { data: locations } = useGetLocations()
  const { data: items } = useGetItems()
  const selectedLocation = useTypedSelector(state => state.main.location)


  // function getCountItems(locationId: string) {
  //   let count = 0
  //   items?.data.forEach(i => {
  //     if (i.location._id === locationId)
  //       count++
  //   })
  //   return count
  // }



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

    </div>
  )
}