import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './mapSlice';
import themeSlice from './themeSlice';
import locationSlice from './locationSlice';

const store = configureStore({
  reducer: {
    map: mapReducer,
    theme: themeSlice,
    location_points: locationSlice,
  },
});

export default store;