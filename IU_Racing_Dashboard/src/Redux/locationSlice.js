import { createSlice } from "@reduxjs/toolkit";
const locationSlice = createSlice({
    name: 'location',
    initialState: {
      carPosition: {
        x:0,
        y:0
      }, // default value
    },
    reducers: {
      setCarPosition: (state, action) => {
        state.carPosition.x = action.payload.x;
        state.carPosition.y = action.payload.y;
      },
    },
  });
  
  export const { setCarPosition } = locationSlice.actions;
  export default locationSlice.reducer;