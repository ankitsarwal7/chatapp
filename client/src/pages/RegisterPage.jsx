  import { useState } from "react";
  import { IoClose } from "react-icons/io5";
  import { Link, useNavigate } from "react-router-dom";
  import uploadFile from "../helpers/Uploadfile";
  import axios from "axios";
  import toast from "react-hot-toast";

  const RegisterPage = () => {
    const [data, setData] = useState({
      name: "",
      email: "",
      password: "",
      profile_pic: "",
    });

    const [uploadPhotoName, setUploadPhotoName] = useState("");
    const navigate = useNavigate()

    const handleOnChange = (e) => {
      const { name, value } = e.target;
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleUploadPhoto = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const response = await uploadFile(file); // Correctly calling the upload helper
        toast.success("Profile photo uploaded successfully!");
        setData((prev) => ({
          ...prev,
          profile_pic: response.secure_url, // Ensure the secure URL is stored
        }));
        setUploadPhotoName(file.name);
      } catch (error) {
        const errorMessage = error?.response?.data?.message || "Error uploading photo.";
        toast.error(errorMessage);
      }
    };

    const handleClearUploadPhoto = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setUploadPhotoName("");
      setData((prev) => ({
        ...prev,
        profile_pic: "",
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      e.stopPropagation();
    
      const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/register`;
    
      try {
        const res = await axios.post(URL, data);
      
    
        // Success handling
        toast.success(res?.data?.message || "Registration successful!");
    
        // Navigate to the email verification page or another route
        navigate('/email');
      } catch (error) {
        // Improved error handling
        if (error.response) {
          // Server responded with an error status (4xx, 5xx)
          const errorMessage = error?.response?.data?.message || "An error occurred on the server.";
          toast.error(errorMessage);
        } else if (error.request) {
          // No response from the server (e.g., network issues)
          toast.error("No response from the server. Please check your internet connection.");
        } else {
          // Other errors during setup (e.g., invalid URL)
          toast.error(`Error: ${error.message}`);
        }
      }
      console.log('data',data)

    };

    
  
    

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400">
        <div className="bg-white w-full max-w-sm mx-2 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-center mb-4">Welcome to Chat App :)</h3>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {/* Name Input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="bg-slate-100 px-2 py-1 focus:outline-primary"
                value={data.name}
                onChange={handleOnChange}
                required
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="bg-slate-100 px-2 py-1 focus:outline-primary"
                value={data.email}
                onChange={handleOnChange}
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="bg-slate-100 px-2 py-1 focus:outline-primary"
                value={data.password}
                onChange={handleOnChange}
                required
              />
            </div>

            {/* Profile Picture Upload */}
            <div className="flex flex-col gap-1">
              <label htmlFor="profile_pic">
                Photo:
                <div className="h-14 bg-slate-200 flex justify-between items-center border rounded hover:border-primary cursor-pointer px-3">
                  <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                    {uploadPhotoName || "Upload profile photo"}
                  </p>
                  {uploadPhotoName && (
                    <button
                      onClick={handleClearUploadPhoto}
                      className="flex justify-center items-center h-6 w-6 rounded-full hover:text-rose-600"
                    >
                      <IoClose className="text-lg" />
                    </button>
                  )}
                </div>
              </label>
              <input
                type="file"
                id="profile_pic"
                name="profile_pic"
                className="hidden"
                onChange={handleUploadPhoto}
              />
            </div>

            {/* Submit Button */}
            <button className="bg-primary text-lg px-4 py-2 hover:bg-secondary rounded font-bold text-white">
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="my-3 text-center">
            Already have an account?{" "}
            <Link to={"/email"} className="hover:text-primary font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    );
  };

  export default RegisterPage;
