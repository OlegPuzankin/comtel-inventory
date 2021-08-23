import { ActionType } from '../action-types';
import { Action } from '../actions';

interface UIState {
  show: boolean;
  window: string | null;

}

const initialState = {
  show: false,
  window: null,
};

const reducer = (
  state: UIState = initialState,
  action: Action
): UIState => {
  switch (action.type) {
    case ActionType.SHOW_MODAL:
      // state.show = true
      // state.window = action.payload
      return { show: true, window: action.payload }
    case ActionType.CLOSE_MODAL:
      state.show = false
      state.window = null
      return { show: false, window: null }

    default:
      return state;
  }
};

export default reducer;
