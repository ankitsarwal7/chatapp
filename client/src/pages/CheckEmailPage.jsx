import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../helpers/Uploadfile";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUserTie } from "react-icons/fa";


const CheckEmail = () => {
  const [data, setData] = useState({
     email: "",
     
  });

   const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

   

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
     
  
    const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/email`;
  
    try {
      const res = await axios.post(URL, data);
  
      // Success handling
      toast.success(res?.data?.message || "Registration successful!");
   
      
      // Navigate to the email verification page or another route
      navigate('/password',{
        
      });
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
      <div className="bg-white w-full max-w-sm mx-2 rounded-xl shadow-lg p-6 relative -mt-12">
      <FaUserTie
      className="mx-auto mb-4" 
      size={60}
      />

        <h3 className="text-xl font-bold text-center mb-4">Welcome to Chat App :)</h3>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Email Input */}
          <div className="flex flex-col gap-1 ">
            <label className="mb-1" htmlFor="email">Email:</label>
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
  
          {/* Submit Button */}
          <button className="bg-primary text-lg px-4 py-2 hover:bg-secondary rounded font-bold text-white">
            Let's Go
          </button>
        </form>
  
        {/* Login Link */}
        <p className="my-3 text-center">
          New User?{" "}
          <Link to={"/register"} className="hover:text-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
  
};

export default CheckEmail;
