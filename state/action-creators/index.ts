import { LocationDoc } from './../../model/Location';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { ItemDoc } from '../../model/Item';


export function showModal(window: string): Action {
  return { type: ActionType.SHOW_MODAL, payload: window }
}
export function closeModal(): Action {
  return { type: ActionType.CLOSE_MODAL }
}
export function setLocation(location: LocationDoc): Action {
  return { type: ActionType.SET_LOCATION, payload: location }
}
export function selectItem(item: ItemDoc): Action {
  return { type: ActionType.SELECT_ITEM, payload: item }
}
export function deselectItem(item: ItemDoc): Action {
  return { type: ActionType.DESELECT_ITEM, payload: item }
}
export function clearSelectedItems(): Action {
  return { type: ActionType.CLEAR_SELECTED_ITEMS }
}
