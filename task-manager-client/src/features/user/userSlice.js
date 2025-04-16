import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserAPI } from '../../api/user'

const initialState = {
  user: null,
  loading: false,
  success: false,
  error: null
}

export const createUser = createAsyncThunk('user/createUser', async (userData, thunkAPI) => {
  try {
    const response = await createUserAPI(userData);
    return response.data
  }
  catch (error) {
    console.log({error})
    return thunkAPI.rejectWithValue(
      error.response?.data || "Something went wrong"
    );
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null
      state.loading = false
      state.success = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.success = true
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.success = false
      })
  }
})

export default userSlice.reducer