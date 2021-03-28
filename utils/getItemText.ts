import { ItemDoc } from '../model/Item'

export function getItemText(item: ItemDoc) {
  const arrText = [item.name]
  if (item.desc)
    arrText.push(item.desc)
  else if (item.quantity > 1)
    arrText.push(`${item.quantity} ${item.measure}`)
  return arrText.join(', ')
}