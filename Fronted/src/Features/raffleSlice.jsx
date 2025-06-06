import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API base URL
const API_BASE = import.meta.env.VITE_API_URL;

// Async thunk to get raffle status
export const fetchRaffleStatus = createAsyncThunk(
  "raffle/fetchStatus",
  async (userId, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE}/api/raffle-status?userId=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch status");
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to join raffle (POST)
export const joinRaffle = createAsyncThunk(
  "raffle/join",
  async (userId, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE}/api/raffle-entry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error("Failed to join raffle");
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const raffleSlice = createSlice({
  name: "raffle",
  initialState: {
    tickets: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch status
      .addCase(fetchRaffleStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRaffleStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload.tickets;
      })
      .addCase(fetchRaffleStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Join raffle
      .addCase(joinRaffle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(joinRaffle.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload.tickets;
      })
      .addCase(joinRaffle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default raffleSlice.reducer;
