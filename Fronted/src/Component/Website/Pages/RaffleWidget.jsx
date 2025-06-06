import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRaffleStatus, joinRaffle } from "../../../Features/raffleSlice";

const RaffleWidget = () => {
  const dispatch = useDispatch();
  const { tickets, loading, error, hasJoined } = useSelector((state) => state.raffle);
  
  // Replace this with actual logged-in userId
  const userId = "123";

  const [joinError, setJoinError] = useState(null);

  useEffect(() => {
    dispatch(fetchRaffleStatus(userId));
  }, [dispatch, userId]);

  const handleJoin = async () => {
    setJoinError(null);
    if (hasJoined) {
      setJoinError("You have already joined the raffle!");
      return;
    }
    try {
      await dispatch(joinRaffle(userId)).unwrap(); // Assuming thunk returns a promise
    } catch (err) {
      setJoinError(err.message || "Failed to join raffle");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-xs">
      <h3 className="text-lg font-semibold mb-2">Join the Raffle</h3>
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {joinError && <p className="text-red-600">{joinError}</p>}
      <p className="mb-4">Tickets: <span className="font-bold">{tickets}</span></p>
      <button
        onClick={handleJoin}
        disabled={loading || hasJoined}
        className={`w-full py-2 rounded transition ${
          hasJoined ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {hasJoined ? "Already Joined" : "Join Raffle"}
      </button>
    </div>
  );
};

export default RaffleWidget;
