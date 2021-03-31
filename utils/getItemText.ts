import { ItemDoc } from '../model/Item'

export function getItemText(item: ItemDoc) {

  const arrText = [item.name]
  if (item.desc) {
    arrText.push(item.desc)
  }

  if (item.quantity > 1) {
    console.log(item, item.quantity);
    arrText.push(`${item.quantity} ${item.measure}`)
  }
  return arrText.join(', ')
}