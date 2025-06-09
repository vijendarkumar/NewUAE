import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE = import.meta.env.VITE_API_URL;

// Submit a new user
export const submitUser = createAsyncThunk(
  "user/submitUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "User submission failed");
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch all submitted users
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/user`);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch users");
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(submitUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
