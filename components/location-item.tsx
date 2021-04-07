import { LocationDoc } from '../model/Location';



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
      <span className='location-name'>{location.name} </span>
      {countItems > 0 && <span className='countItems'>{countItems}</span>}
    </div>
  )
}