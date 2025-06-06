import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStory, fetchStories } from "../../Features/storySlice";


const StoryTable = () => {
  const dispatch = useDispatch();
  const { stories, loading, error } = useSelector((state) => state.stories);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  const paginated = stories.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(stories.length / perPage);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      await dispatch(deleteStory(id));
      dispatch(fetchStories()); // Reload stories after delete
      setPage(1); // Reset to first page
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Stories List</h2>

      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {!loading && !error && stories.length === 0 && <p>No stories found.</p>}

      {paginated.length > 0 && (
        <>
          <table className="min-w-full border mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Title</th>
                <th className="p-2 text-left">Snippet</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Preview</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((s) => (
                <tr key={s._id} className="border-t">
                  <td className="p-2">{s.title}</td>
                  <td className="p-2 max-w-xs truncate">{s.snippet}</td>
                  <td className="p-2">{s.type}</td>
                  <td className="p-2">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    {s.type === "image" ? (
                      <img
                        src={`http://localhost:3000/uploads/${s.filename}`}
                        alt={s.title}
                        className="w-16 h-10 object-cover"
                      />
                    ) : (
                      <a
                        href={`http://localhost:3000/uploads/${s.filename}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    )}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex gap-2 justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  page === i + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StoryTable;
