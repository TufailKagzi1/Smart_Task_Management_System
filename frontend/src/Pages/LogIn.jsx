import React, { useContext, useState } from "react";
import LeftImage from "../components/auth/LeftImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../Services/ApiService";
import { UserContext } from "../context/user";

const LogIn = () => {

  const currentUser = useContext(UserContext);
  

  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [APIError, setAPIError] = useState('');
  const [passwordEye, setPasswordEye] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // login api
      try{
          const response = await ApiService.loginUser(loginData);
          if(response.statusCode === 200){
            localStorage.setItem('token',response.token);
            localStorage.setItem('role',response.role);
            const loginUser = await ApiService.getUserProfile();
            currentUser.setUser({name:loginUser.user.name,username:loginUser.user.username,role:loginUser.user.role,email:loginUser.user.email})
            navigate('/');
          }

      }catch(error){
        setAPIError(error.response?.data?.message || error.message);
        setTimeout(()=> setAPIError(''),5000);
      }
    
    }
  };

  const validateForm = () => {
  const newErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!loginData.username) {
    newErrors.username = "Username is required.";
  } else if (/\s/.test(loginData.username)) {
    newErrors.username = "Username must not contain spaces.";
  }

  if (!loginData.email) {
    newErrors.email = "Email is required.";
  } else if (!emailRegex.test(loginData.email)) {
    newErrors.email = "Invalid email format.";
  } else if (/\s/.test(loginData.email)) {
    newErrors.email = "Email must not contain spaces.";
  }

  if (!loginData.password) {
    newErrors.password = "Password is required.";
  } else if (loginData.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters long.";
  }

  setError(newErrors);
  return Object.keys(newErrors).length === 0;
};


  return (
    <div className="grid h-screen w-screen grid-cols-1 items-center p-4 md:grid-cols-[1.5fr,_2.5fr]">
      <div className="hidden md:block">
        <LeftImage />
      </div>
      <div className="flex h-full items-center justify-center">
        <div>
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-3xl font-bold">Login</p>
            <p className="icon-color text-sm">
              Welcome back! Please enter your details
            </p>
            {
              APIError && (
                <p className="mt-1 text-sm text-red-500">{APIError}</p>
              )
            }
          </div>
          <form onSubmit={handleLogIn}>
            <div className="mt-3 flex cursor-pointer flex-col">
              <label htmlFor="username" className="font-semibold">
                Username
              </label>
              <div className="flex w-96 items-center justify-between rounded border border-[#E5E5E5] p-2">
                <input
                  className="w-96 p-1 outline-none"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={loginData.username}
                  onChange={handleChange}
                />
              </div>
              {error.username && (
                <p className="mt-1 text-sm text-red-500">{error.username}</p>
              )}
            </div>
            <div className="mt-3 flex cursor-pointer flex-col">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <div className="flex w-96 items-center justify-between rounded border border-[#E5E5E5] p-2">
                <input
                  className="w-96 p-1 outline-none"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={handleChange}
                />
              </div>
              {error.email && (
                <p className="mt-1 text-sm text-red-500">{error.email}</p>
              )}
            </div>

            <div className="mt-3 flex cursor-pointer flex-col">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <div className="flex w-96 items-center justify-between rounded border border-[#E5E5E5] p-2">
                <input
                  className="w-80 p-1 outline-none"
                  type={passwordEye ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handleChange}
                />
                <div onClick={() => setPasswordEye(!passwordEye)}>
                  <FontAwesomeIcon
                    icon={passwordEye ? faEye : faEyeSlash}
                    className="icon-color cursor-pointer"
                  />
                </div>
              </div>
              {error.password && (
                <p className="mt-1 text-sm text-red-500">{error.password}</p>
              )}
            </div>

            <div className="my-4 flex cursor-pointer flex-col">
              <input
                className="w-96 cursor-pointer bg-[#1B1C1E] p-2 text-white"
                type="submit"
                value="Login"
              />
            </div>
          </form>
          <p className="icon-color -mt-2 text-center text-sm">
            Don't have an account?
            <Link to={"/signup"}>
              <span className="ml-1 cursor-pointer font-medium text-black">
                Sign in
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
