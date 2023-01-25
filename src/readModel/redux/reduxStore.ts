import { configureStore } from '@reduxjs/toolkit';
import { entryApiSlice } from '../entry';

const reduxStore = configureStore({
  reducer: {
    [entryApiSlice.reducerPath]: entryApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // to avoid warnings regarding storing instances of DateTime
      serializableCheck: false,
    }).concat(entryApiSlice.middleware),
});

type ReduxStore = typeof reduxStore;

export { reduxStore };
export type { ReduxStore };
