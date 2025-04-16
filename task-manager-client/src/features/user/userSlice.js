import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserAPI, loginUserAPI, getProfileAPI, logoutUserAPI, uploadAvatarAPI, updateProfileAPI, deleteAccountAPI } from '../../api/user'
import { toast } from 'react-hot-toast'

const initialState = {
  user: null,
  loading: false,
  success: false,
  error: null
}

export const createUser = createAsyncThunk('user/createUser', async (userData, thunkAPI) => {
  try {
    const response = await createUserAPI(userData);
    if (response.status === 201) {
      const { token } =  response.data
      localStorage.setItem('authToken', token)
      toast.success('Signup completed')
    }
    if (response.status !== 201) {
      throw new Error('Signup failed')
    } 
    return response.data
  }
  catch (error) {
    if (error.response.data.code === 11000){
      toast.error("User already exists")
    }
    else {
      toast.error(error.response.data.message)
    }
    return thunkAPI.rejectWithValue(
      error.response?.data || "Something went wrong"
    );
  }
})

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginData, thunkAPI) => {
    try {
      const response = await loginUserAPI(loginData);
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("authToken", token);
        toast.success("Login Successful");
      }
      if (response.status !== 200) {
        throw new Error("Login failed");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.e);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, thunkAPI) => {
    try {
      const response = await getProfileAPI();
      return response.data;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      const response = await logoutUserAPI();
      if (response.status !== 200) {
        toast.error("Logout Failed");
      } else if (response.status === 200) {
        toast.success("Logout successfully.");
        localStorage.removeItem("authToken");
      }
      return response;
    } catch (error) {
      toast.error(error.response.data.e);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);


export const uploadAvatar = createAsyncThunk(
  "user/uploadAvatar",
  async (data, thunkAPI) => {
    try {
      const response = await uploadAvatarAPI(data)
      if (response.status !== 200) {
        toast.error("Upload Image Failed")
      }
      else if (response.status === 200) {
        toast.success("Image uploaded successfully.")
      }
      return response
    }
    catch (error) {
      toast.error(error.response.data.e)
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      )
    }
  }
)

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (data, thunkAPI) => {
    try {
      const response = await updateProfileAPI(data);
      if (response.status !== 200) {
        toast.error("Profile Update Failed");
      } else if (response.status === 200) {
        toast.success("Profile updated successfully.");
      }
      return response;
    } catch (error) {
      toast.error(error.response.data.e);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async (_, thunkAPI) => {
    try {
      const response = await deleteAccountAPI();
      if (response.status !== 200) {
        toast.error("Account Delete Failed");
      } else if (response.status === 200) {
        toast.success("Account Deleted successfully.");
        localStorage.removeItem('authToken')
      }
      return response;
    } catch (error) {
      toast.error(error.response.data.e);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

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
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.success = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.success = true;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  }
})

export default userSlice.reducer