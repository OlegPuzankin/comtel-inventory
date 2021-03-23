import { ItemDoc } from '../model/Item'

export function getCountItems(locationId: string, items: Array<ItemDoc>) {
  if (!items)
    return
  let count = 0
  items?.forEach(i => {
    if (i.location._id === locationId)
      count++
  })
  return count
}