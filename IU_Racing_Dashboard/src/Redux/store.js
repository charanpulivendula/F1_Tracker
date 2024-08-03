import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './mapSlice';
import themeSlice from './themeSlice';

const store = configureStore({
  reducer: {
    map: mapReducer,
    theme: themeSlice
  },
});

export default store;