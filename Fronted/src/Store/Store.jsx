// src/Store/Store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Features/UserSlice';
import raffleReducer from "../Features/raffleSlice";
import storyReducer from "../Features/storySlice";

const store = configureStore({
  reducer: {
    app: userReducer,      // useSelector((state) => state.app)
    raffle: raffleReducer, // useSelector((state) => state.raffle)
    stories: storyReducer, // useSelector((state) => state.stories)
  },
});

export default store;
