import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userstoryshow } from "../../Features/UserSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { stories, loading, error } = useSelector((state) => state.story); // ✅ Make sure "story" is the correct key from your store

  const [page, setPage] = useState(1);
  const perPage = 10;

  const paged = stories?.slice((page - 1) * perPage, page * perPage); // ✅ Optional chaining to avoid crash if stories is undefined

  useEffect(() => {
    dispatch(userstoryshow());
  }, [dispatch]);

  return (
    <main className="p-4 space-y-6">
      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded-xl shadow">
          <h1>Story Card</h1>
          <p>{stories.length} Stories</p> {/* ✅ FIXED: was using undefined `storiesLength` */}
        </div>
        <div className="bg-green-500 text-white p-4 rounded-xl shadow">
          <h1>Submit Story</h1>
          <p>{stories.length} Users Submitted</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-xl shadow">
          <h1>Payment Story</h1>
          <p>600 Dirham</p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-xl shadow">
          <h1>Join Refer</h1>
          <p>61 Users</p>
        </div>
      </section>

      {/* Story Table */}
      <section className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Website User Story Table</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && paged.length > 0 && (
          <>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Body</th>
                  <th className="border p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((s) => (
                  <tr key={s._id}>
                    <td className="border p-2">{s.name}</td>
                    <td className="border p-2">{s.title}</td>
                    <td className="border p-2">{s.email}</td>
                    <td className="border p-2">{s.body}</td>
                    <td className="border p-2">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Buttons */}
            <div className="flex gap-2 mt-4 flex-wrap">
              {[...Array(Math.ceil(stories.length / perPage))].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-2 py-1 border rounded ${
                    page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-100"
                  }`}
                  disabled={page === i + 1}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}

        {!loading && paged.length === 0 && <p>No stories found.</p>}
      </section>
    </main>
  );
};

export default HomePage;
