import { LocationDoc } from '../model/Location';
import { FolderIcon } from './icons/folder-icon';
import { PenIcon } from './icons/pen-icon';


interface Props {
  location: LocationDoc,
  setLocation: Function,
  countItems: number,
  isSelected: boolean
}

// interface Location extends LocationDoc {
//   countItems: number
// }

export function LocationItem({ location, setLocation, countItems, isSelected }: Props) {
  let css = 'location-item'
  if (isSelected)
    css = 'location-item location-item-selected'


  return (
    <div className={css} onClick={() => setLocation(location)}>
      {/* <div className='folder-icon'>
        <FolderIcon />
      </div> */}
      <span className='location-name'>{location.name} </span>
      <span className='countItems'>{countItems}</span>
    </div>

  )

}