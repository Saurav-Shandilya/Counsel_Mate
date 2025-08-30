import { useState } from "react";
import axios from "axios";

export default function UserForm({ onComplete }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    education: "",
    stream: "",
    tenthPercentage: "",
    twelfthPercentage: "",
    jeeAspirant: false,
    jeePercentage: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post("http://localhost:5000/api/user/profile", formData, {
        withCredentials: true,
      });

      // Pass the complete user profile back to the parent component
      onComplete(res.data.profile);
    } catch (err) {
      console.error(err);
      setError("Failed to save profile. Make sure you are logged in!");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-2xl shadow-lg w-full max-w-4xl overflow-auto"
        style={{ backgroundColor: "#1c1c1c", maxHeight: "90vh" }}
      >
        <h2 className="text-2xl font-bold text-center mb-8 text-white">
          Profile Completion
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: "#bd5e2b" }}>
              Personal Details
            </h3>

            {["name", "age", "phone", "email"].map((field) => (
              <div className="mb-4" key={field}>
                <label className="block mb-1 text-gray-300">
                  {field === "name"
                    ? "Full Name"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "age" ? "number" : field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={
                    field === "name"
                      ? "Enter your name"
                      : field === "age"
                      ? "18"
                      : field === "phone"
                      ? "9876543210"
                      : "example@gmail.com"
                  }
                  className="w-full border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bd5e2b] bg-black text-white placeholder-gray-500"
                  required
                />
              </div>
            ))}
          </div>

          {/* Educational Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: "#bd5e2b" }}>
              Educational Details
            </h3>
            <div className="mb-4">
              <label className="block mb-1 text-gray-300">Education Level</label>
              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bd5e2b] bg-black text-white"
                required
              >
                <option value="">Select</option>
                <option value="10th">10th Pass</option>
                <option value="12th">12th Pass</option>
              </select>
            </div>

            {/* 10th % field (visible for both 10th and 12th pass) */}
            {formData.education && (
              <div className="mb-4">
                <label className="block mb-1 text-gray-300">10th %</label>
                <input
                  type="number"
                  name="tenthPercentage"
                  value={formData.tenthPercentage}
                  onChange={handleChange}
                  placeholder="Enter your 10th percentage"
                  className="w-full border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bd5e2b] bg-black text-white placeholder-gray-500"
                  required
                />
              </div>
            )}

            {formData.education === "12th" && (
              <>
                <div className="mb-4">
                  <label className="block mb-1 text-gray-300">Stream</label>
                  <select
                    name="stream"
                    value={formData.stream}
                    onChange={handleChange}
                    className="w-full border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bd5e2b] bg-black text-white"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Science">Science</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-gray-300">12th %</label>
                  <input
                    type="number"
                    name="twelfthPercentage"
                    value={formData.twelfthPercentage}
                    onChange={handleChange}
                    placeholder="Enter your 12th percentage"
                    className="w-full border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bd5e2b] bg-black text-white placeholder-gray-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="jeeAspirant"
                      name="jeeAspirant"
                      checked={formData.jeeAspirant}
                      onChange={handleChange}
                      className="form-checkbox h-5 w-5 text-[#bd5e2b] rounded-md"
                    />
                    <label htmlFor="jeeAspirant" className="ml-2 text-gray-300">
                      JEE Aspirant
                    </label>
                  </div>
                </div>

                {formData.jeeAspirant && (
                  <div className="mb-4">
                    <label className="block mb-1 text-gray-300">JEE %</label>
                    <input
                      type="number"
                      name="jeePercentage"
                      value={formData.jeePercentage}
                      onChange={handleChange}
                      placeholder="Enter your JEE percentage"
                      className="w-full border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bd5e2b] bg-black text-white placeholder-gray-500"
                      required
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-lg text-sm text-center" style={{ backgroundColor: "#bd5e2b", color: "white" }}>
            {error}
          </div>
        )}

        <div className="mt-8">
          <button
            type="submit"
            className="w-full font-semibold py-3 rounded-lg transition text-white hover:opacity-90"
            style={{ backgroundColor: "#bd5e2b" }}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
