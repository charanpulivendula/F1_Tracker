import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    mapType: 'KY', // default value
  },
  reducers: {
    setMapType: (state, action) => {
      state.mapType = action.payload;
    },
  },
});

export const { setMapType } = mapSlice.actions;
export default mapSlice.reducer;