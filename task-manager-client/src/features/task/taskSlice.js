import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTaskAPI,
  deleteTaskAPI,
  editTaskAPI,
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
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const createTask = createAsyncThunk(
  "user/createTask",
  async (data, thunkAPI) => {
    try {
      const response = await createTaskAPI(data);
      if (response.status === 201) {
        toast.success("Task created successfully")
      }
      else {
        throw new Error("Something went wrong");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  "user/deleteTask",
  async (data, thunkAPI) => {
    try {
      const response = await deleteTaskAPI(data);
      if (response.status === 200) {
        toast.success("Task deleted successfully");
      } else {
        throw new Error("Something went wrong");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const editTask = createAsyncThunk(
  "user/editTask",
  async (data, thunkAPI) => {
    console.log(data)
    try {
      const response = await editTaskAPI(data);
      if (response.status === 200) {
        toast.success("Task edited successfully");
      } else {
        throw new Error("Something went wrong");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
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
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(editTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTask.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(editTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default taskSlice.reducer;
