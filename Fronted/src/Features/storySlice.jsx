import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE = import.meta.env.VITE_API_URL;

// ✅ Submit Story Thunk
export const submitStory = createAsyncThunk(
  "story/submitStory",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/story`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const result = await res.json();
      return result.media; // Assuming API returns { media }
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

// ✅ Delete Story Thunk
export const deleteStory = createAsyncThunk(
  "story/deleteStory",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/story/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete story");
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Delete failed");
    }
  }
);

// ✅ Slice
const storySlice = createSlice({
  name: "story",
  initialState: {
    stories: [],
    loading: false,
    submitting: false,
    deleting: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Submit story
      .addCase(submitStory.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitStory.fulfilled, (state, action) => {
        state.submitting = false;
        state.stories.push(action.payload);
      })
      .addCase(submitStory.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })

      // Fetch stories
      .addCase(fetchStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete story
      .addCase(deleteStory.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.deleting = false;
        state.stories = state.stories.filter(
          (story) => story._id !== action.payload
        );
      })
      .addCase(deleteStory.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  },
});

export default storySlice.reducer;
