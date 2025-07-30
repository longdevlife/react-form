import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  editing: null,
  search: "",
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    // action to add student
    addStudent: (state, action) => {
      state.list.push(action.payload);
    },
    // action to remove student
    removeStudent: (state, action) => {
      state.list = state.list.filter((sv) => sv.id !== action.payload);
    },
    setEditing: (state, action) => {
      state.editing = action.payload;
    },
    updateStudent: (state, action) => {
      const idx = state.list.findIndex((sv) => sv.id === action.payload.id);
      if (idx !== -1) state.list[idx] = action.payload;
      state.editing = null;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const {
  addStudent,
  removeStudent,
  setEditing,
  updateStudent,
  setSearch,
} = studentSlice.actions;
export default studentSlice.reducer;
