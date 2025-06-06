import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE = import.meta.env.VITE_API_URL;

// ✅ FIXED: Correct thunk name from `story` to `submitStory`
export const submitStory = createAsyncThunk(
  "story/submitStory",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/story`, {
        method: "POST",
        body: formData, // ✅ FIXED: Use actual formData, no need for Content-Type with FormData
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const result = await res.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// ✅ Fetch Stories Thunk
export const fetchStories = createAsyncThunk(
  "story/fetchStories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/story`);
      if (!res.ok) throw new Error("Failed to fetch stories");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to load stories");
    }
  }
);

// ✅ Slice
const storySlice = createSlice({
  name: "story",
  initialState: {
    stories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Submit story
      .addCase(submitStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitStory.fulfilled, (state, action) => {
        state.loading = false;
        state.stories.push(action.payload);
      })
      .addCase(submitStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch stories
      .addCase(fetchStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = action.payload;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default storySlice.reducer;
