import { LoggedUser } from './../../interfaces/common_interfaces';
import { ItemDoc } from './../../model/Item';
import { LocationDoc } from '../../model/Location';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface MainState {
  location: LocationDoc | null;
  selectedItems: Array<ItemDoc>;
  loggedUser: LoggedUser

}

const initialState = {
  location: null,
  selectedItems: [],
  loggedUser: null
};

const reducer = (
  state: MainState = initialState,
  action: Action
): MainState => {
  switch (action.type) {
    case ActionType.SELECT_ITEM:
      return { ...state, selectedItems: [...state.selectedItems, action.payload] };
    case ActionType.DESELECT_ITEM:
      return { ...state, selectedItems: state.selectedItems.filter(i => i._id !== action.payload._id) };
    case ActionType.SET_LOCATION:
      return { ...state, location: action.payload, selectedItems: [] };
    case ActionType.CLEAR_SELECTED_ITEMS:
      return { ...state, selectedItems: [] };
    case ActionType.SET_LOGGED_USER:
      return { ...state, loggedUser: action.payload };
    default:
      return state;
  }
};

export default reducer;
