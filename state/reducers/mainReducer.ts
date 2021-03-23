import { ItemDoc } from './../../model/Item';
import { LocationDoc } from '../../model/Location';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface MainState {
  location: LocationDoc | null;
  selectedItems: Array<ItemDoc>;
}

const initialState = {
  location: null,
  selectedItems: []
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
    default:
      return state;
  }
};

export default reducer;
