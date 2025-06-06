import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { submitStory } from "../../Features/storySlice";


const StoryInsert = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.stories);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    snippet: "",
    file: null,
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.snippet ||
      !formData.file ||
      !formData.type
    ) {
      alert("Please fill all fields and select a file.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("snippet", formData.snippet);
    data.append("media", formData.file); // <-- must be "media"
    data.append("type", formData.type);

    dispatch(submitStory(data));
  };

  // Reset form on success
  useEffect(() => {
    if (success) {
       Swal.fire({
            title: "Thank You",
            icon: "success",
            confirmButtonText: "OK",
            draggable: true,
          }).then(() => {
            // This runs after OK is clicked
            window.location.href = "story-insert"; // Redirect or reload
          });
      dispatch(resetState());
    }
  }, [success, dispatch]);

  return (
    <div className="p-4 mx-auto">
      <h2 className="text-xl font-semibold mb-4">Insert New Story</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="snippet"
          value={formData.snippet}
          onChange={handleChange}
          placeholder="Snippet"
          rows="4"
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Type</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
        </select>
        <input
          type="file"
          accept="image/*,video/*,audio/*"
          onChange={handleFileChange}
          className="w-full"
          required
          ref={fileInputRef}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Story"}
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default StoryInsert;
