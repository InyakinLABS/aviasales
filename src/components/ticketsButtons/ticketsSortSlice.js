import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortBy: ''
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort(state, action) {
      state.sortBy = action.payload;
    }
  }
});

export const { setSort } = sortSlice.actions;
export default sortSlice.reducer;