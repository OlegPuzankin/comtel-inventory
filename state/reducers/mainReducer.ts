import { LoggedUser } from './../../interfaces/common_interfaces';
import { ItemDoc } from './../../model/Item';
import { LocationDoc } from '../../model/Location';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import produce from 'immer'

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

const reducer = produce((
  state: MainState = initialState,
  action: Action
): MainState => {
  switch (action.type) {
    case ActionType.SELECT_ITEM:
      state.selectedItems.push(action.payload)
      return state
    // return { ...state, selectedItems: [...state.selectedItems, action.payload] };
    case ActionType.DESELECT_ITEM:
      const index = state.selectedItems.findIndex(i => i._id === action.payload._id)
      if (index !== -1) state.selectedItems.splice(index, 1)
      return state
    // return { ...state, selectedItems: state.selectedItems.filter(i => i._id !== action.payload._id) };
    case ActionType.SET_LOCATION:
      state.location = action.payload
      state.selectedItems = []
      return state
    // return { ...state, location: action.payload, selectedItems: [] };
    case ActionType.CLEAR_SELECTED_ITEMS:
      state.selectedItems = []
      return state
    // return { ...state, selectedItems: [] };
    case ActionType.SET_LOGGED_USER:
      state.loggedUser = action.payload
      return state
    // return { ...state, loggedUser: action.payload };
    default:
      return state;
  }
});

export default reducer;
