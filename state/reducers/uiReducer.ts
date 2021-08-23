import { ActionType } from '../action-types';
import { Action } from '../actions';
import produce from 'immer'

interface UIState {
  show: boolean;
  window: string | null;

}

const initialState = {
  show: false,
  window: null,
};

const reducer = produce((
  state: UIState = initialState,
  action: Action
): UIState => {
  switch (action.type) {
    case ActionType.SHOW_MODAL:
      state.show = true
      state.window = action.payload
      return state
    case ActionType.CLOSE_MODAL:
      state.show = false
      state.window = null
      return state

    default:
      return state;
  }
});

export default reducer;
