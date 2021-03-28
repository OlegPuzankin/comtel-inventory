import { LocationDoc } from './../../model/Location';
import { ActionType } from '../action-types';
import { ItemDoc } from '../../model/Item';
import { LoggedUser } from '../../interfaces/common_interfaces';

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
interface SET_LOGGED_USER {
  type: ActionType.SET_LOGGED_USER,
  payload: LoggedUser
}



export type Action = SHOW_MODAL | CLOSE_MODAL | SET_LOCATION
  | SELECT_ITEM | DESELECT_ITEM | CLEAR_SELECTED_ITEMS | SET_LOGGED_USER

