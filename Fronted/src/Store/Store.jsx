// src/Store/Store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Features/UserSlice';  // ✅ Check path
import raffleReducer from "../Features/raffleSlice";
import storyReducer from "../Features/storySlice";

const store = configureStore({
  reducer: {
    app: userReducer,      // for userSlice
    raffle: raffleReducer,
    stories: storyReducer,
  },
});

export default store;
