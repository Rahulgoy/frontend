import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    saveStudents: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveStudents } = studentsSlice.actions;

export default studentsSlice.reducer;