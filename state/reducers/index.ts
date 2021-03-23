import { combineReducers } from 'redux';
import uiReducer from './uiReducer';
import mainReducer from './mainReducer';

const reducers = combineReducers({
  ui: uiReducer,
  main: mainReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
