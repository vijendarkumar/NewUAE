import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE = import.meta.env.VITE_API_URL
// Thunk for submitting user data
export const userdata = createAsyncThunk(
  "user/userdata",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const result = await res.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Thunk for fetching user stories
export const userstoryshow = createAsyncThunk(
  "user/userstoryshow",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/user`);
      if (!res.ok) throw new Error("Failed to fetch stories");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to load stories");
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    stories: [], // ✅ added this
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle user submission
      .addCase(userdata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userdata.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(userdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle user stories
      .addCase(userstoryshow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userstoryshow.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = action.payload;
      })
      .addCase(userstoryshow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load stories";
      });
  },
});

export default userSlice.reducer;
