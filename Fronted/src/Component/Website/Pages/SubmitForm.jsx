import React, { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import RaffleWidget from "./RaffleWidget";
import { submitUser } from "../../../Features/UserSlice";
const SubmitForm = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    body: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email required";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.body.trim()) newErrors.body = "Story body is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await dispatch(submitUser(formData)).unwrap(); // waits and throws on error
      Swal.fire({
        title: "Thank You",
        icon: "success",
        confirmButtonText: "OK",
        draggable: true,
      }).then(() => {
        // This runs after OK is clicked
        window.location.href = "/"; // Redirect or reload
      });
    } catch (error) {
      console.error("Submission failed:", error);
      setErrors({ api: "Submission failed. Please try again later." });
    }
    // button 1dhirm
    
  };
  const handleClick = () => {
    Swal.fire({
      icon: "success",
      title: "Payment successful!",
      text: "Thank you for supporting the lore.",
      timer: 3000,
      showConfirmButton: false,
    });
  };

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8 p-5 max-w-7xl mx-auto px-4 rounded shadow">
      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6  space-y-4" id="submit">
        <h2 className="text-xl font-semibold mb-2">Submit Your Story</h2>

        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Story Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Story Body</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows={5}
            className="w-full p-2 border rounded"
          />
          {errors.body && <p className="text-red-500 text-sm">{errors.body}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      {/* Award Panels + Button + Widget */}
      <div className="space-y-6 mt-0 md:mt-20 ">
        <a
          href="https://top216.com/vote"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Vote on Top216"
          className="block p-5 bg-yellow-100 hover:bg-yellow-200 border border-yellow-300 rounded-2xl shadow-md transition duration-300 transform hover:scale-105"
        >
          <h2 className="text-xl font-semibold text-yellow-800 mb-1">
            Vote Now
          </h2>
          <p className="text-yellow-700">
            Support your favorites on Top216! Cast your vote and make a
            difference.
          </p>
        </a>

        <a
          href="https://thetop36.com/highlights"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View highlights on TheTop36"
          className="block p-5 bg-indigo-100 hover:bg-indigo-200 border border-indigo-300 rounded-2xl shadow-md transition duration-300 transform hover:scale-105"
        >
          <h2 className="text-xl font-semibold text-indigo-800 mb-1">
            See Highlights
          </h2>
          <p className="text-indigo-700">
            Discover the best moments and featured highlights from The Top 36
            awards.
          </p>
        </a>

        {/* Button + RaffleWidget side-by-side */}
        <div className="flex flex-col sm:flex-row sm:items-center space-x-4 space-y-5">
          <button
            onClick={handleClick}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto"
          >
            Support the Lore – €1
          </button>
          <div className="w-full block sm:w-auto">
            <RaffleWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitForm;
