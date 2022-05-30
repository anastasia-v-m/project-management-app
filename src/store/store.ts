import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { reducer } from './reducers';

const RootReducer = combineReducers({
  reducer,
});
const store = configureStore({
  reducer: {
    reducer: reducer,
  },
});

const storeFn = () => store;

export default store;

export type RootState = ReturnType<typeof RootReducer>;

export type AppStore = ReturnType<typeof storeFn>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
