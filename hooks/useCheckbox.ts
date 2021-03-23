import React from 'react'
import { ItemDoc } from '../model/Item'
import { useActions } from './useActions'
import { useTypedSelector } from './useTypedSelector'

export function useCheckBox(items: Array<ItemDoc>) {
  const { selectItem, deselectItem, clearSelectedItems } = useActions()
  const selectedItems = useTypedSelector(state => state.main.selectedItems)
  const [checked, setChecked] = React.useState(false)


  function toggleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked)
      items.forEach(i => selectItem(i))
    else {
      clearSelectedItems()
    }
    setChecked(!checked)
  }

  //clear checbox if no item selected
  React.useEffect(() => {
    if (selectedItems.length === 0)
      setChecked(false)
  }, [selectedItems])

  return {
    checked,
    setChecked,
    toggleCheckbox
  }

}
