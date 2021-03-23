import { LocationDoc } from './../../model/Location';
import { ActionType } from '../action-types';
import { ItemDoc } from '../../model/Item';

interface SHOW_MODAL {
  type: ActionType.SHOW_MODAL
  payload: string
}
interface CLOSE_MODAL {
  type: ActionType.CLOSE_MODAL
}
interface SET_LOCATION {
  type: ActionType.SET_LOCATION,
  payload: LocationDoc
}
interface SELECT_ITEM {
  type: ActionType.SELECT_ITEM,
  payload: ItemDoc
}
interface DESELECT_ITEM {
  type: ActionType.DESELECT_ITEM,
  payload: ItemDoc
}
interface CLEAR_SELECTED_ITEMS {
  type: ActionType.CLEAR_SELECTED_ITEMS,
}



export type Action = SHOW_MODAL | CLOSE_MODAL | SET_LOCATION | SELECT_ITEM | DESELECT_ITEM | CLEAR_SELECTED_ITEMS

