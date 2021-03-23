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
      return { show: true, window: action.payload };
    case ActionType.CLOSE_MODAL:
      return { show: false, window: null };

    default:
      return state;
  }
};

export default reducer;
