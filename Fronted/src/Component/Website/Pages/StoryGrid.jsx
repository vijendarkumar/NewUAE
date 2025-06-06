import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStories } from "../../../Features/storySlice";
import { Link } from "react-router-dom";

const StoryGrid = () => {
  const dispatch = useDispatch();
  const { stories, loading, error } = useSelector((state) => state.stories);

  // State to control how many stories to show
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  if (loading) return <p>Loading stories...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (stories.length === 0) return <p>No stories available.</p>;

  // Slice stories to visible count
  const visibleStories = stories.slice(0, visibleCount);

  // Handler to load more stories
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section className="p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {visibleStories.map((story) => {
        const fileExtension = story.filename.split(".").pop().toLowerCase();

        return (
          <div
            key={story._id}
            className="group bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300"
          >
            {["jpg", "jpeg", "png", "gif"].includes(fileExtension) && (
              <img
                src={`http://localhost:3000/uploads/${story.filename}`}
                alt={story.title}
                className="w-full h-40 object-cover"
              />
            )}

            {["mp3", "wav", "ogg"].includes(fileExtension) && (
              <audio controls className="w-full">
                <source
                  src={`http://localhost:3000/uploads/${story.filename}`}
                  type={`audio/${fileExtension}`}
                />
                Your browser does not support the audio element.
              </audio>
            )}

            {["mp4", "webm", "ogg"].includes(fileExtension) && (
              <video controls className="w-full h-40 object-cover">
                <source
                  src={`http://localhost:3000/uploads/${story.filename}`}
                  type={`video/${fileExtension}`}
                />
                Your browser does not support the video tag.
              </video>
            )}

            <div className="p-4">
              <h3 className="font-semibold text-lg">{story.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-5">{story.snippet}</p>
              <Link
                to="/"
                className="inline-block text-blue-600 mt-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                Read More →
              </Link>
            </div>
          </div>
        );
      })}

      {/* Show Load More only if there are more stories to show */}
      {visibleCount < stories.length && (
        <div className="col-span-full text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default StoryGrid;
