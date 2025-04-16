import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTasksAPI
} from "../../api/task";
import { toast } from "react-hot-toast";

const initialState = {
  tasks: null,
  task: null,
  loading: false,
  success: false,
  error: null,
};

export const getTasks = createAsyncThunk(
  "user/getTasks",
  async (_, thunkAPI) => {
    try {
      const response = await getTasksAPI();
      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }
      return response.data;
    } catch (error) {
      if (error.response.data.code === 11000) {
        toast.error("User already exists");
      } else {
        toast.error(error.response.data.message);
      }
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: (state) => {
      state.tasks = null;
      state.task = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.success = true;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default taskSlice.reducer;
