import React, { useContext, useState } from "react";
import LeftImage from "../components/auth/LeftImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../Services/ApiService";
import { UserContext } from "../context/user";

const Signup = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  
  const [error, setError] = useState({});
  const [APIError, setAPIError] = useState("");
  const [passwordEye, setPasswordEye] = useState({
    passwordEye1: false,
    passwordEye2: false,
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEye = (passEye) => {
    setPasswordEye((prev) => ({
      passwordEye1: passEye === 1 ? !prev.passwordEye1 : prev.passwordEye1,
      passwordEye2: passEye === 2 ? !prev.passwordEye2 : prev.passwordEye2,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!registerData.name) {
      newErrors.name = "Name is required.";
    }
    if (!registerData.username) {
      newErrors.username = "Username is required.";
    }
    if (!registerData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(registerData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!registerData.password) {
      newErrors.password = "Password is required.";
    } else if (registerData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        let registration = {
          name: registerData.name,
          username: registerData.username,
          email: registerData.email,
          password: registerData.password,
          role:"USER",
        };

        const response = await ApiService.registerUser(registerData);
        if (response.statusCode === 200) {        
          user.setUser({ name: response.user.name, username: response.user.username, role: response.user.role, email: response.user.email });
          localStorage.setItem('token',response.token)
          localStorage.setItem('role',response.user.role)
          navigate('/');
        }
      } catch (error) {
        setAPIError(error.response?.data?.message || error.message);
        setTimeout(()=> setAPIError(''),5000);
      }
      console.log("Form submitted successfully!", registerData);
      console.log("user context :",user)
    }
  };

  return (
    <div className="grid h-screen w-screen grid-cols-1 items-center p-4 md:grid-cols-[1.5fr,_2.5fr]">
      <div className="hidden md:block">
        <LeftImage />
      </div>
      <div className="flex h-full items-center justify-center">
        <div>
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-3xl font-bold">Create Your Account</p>
            <p className="icon-color text-sm">
              Welcome! Please enter your details
            </p>
            {APIError && (
              <p className="mt-1 text-sm text-red-500">{APIError}</p>
            )}
          </div>
          <form onSubmit={handleSignUp}>
            <div className="mt-3 flex cursor-pointer flex-col">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <div className="flex w-96 items-center justify-between rounded border border-[#E5E5E5] p-2">
                <input
                  className="w-96 p-1 outline-none"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={registerData.name}
                  onChange={handleChange}
                />
              </div>
              {error.name && (
                <p className="mt-1 text-sm text-red-500">{error.name}</p>
              )}
            </div>

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
                  value={registerData.username}
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
                  value={registerData.email}
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
                  type={passwordEye.passwordEye1 ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={registerData.password}
                  onChange={handleChange}
                />
                <div onClick={() => handleEye(1)}>
                  <FontAwesomeIcon
                    icon={passwordEye.passwordEye1 ? faEye : faEyeSlash}
                    className="icon-color cursor-pointer"
                  />
                </div>
              </div>
              {error.password && (
                <p className="mt-1 text-sm text-red-500">{error.password}</p>
              )}
            </div>

            <div className="mt-3 flex cursor-pointer flex-col">
              <label htmlFor="passwordRetype" className="font-semibold">
                Retype Password
              </label>
              <div className="flex w-96 items-center justify-between rounded border border-[#E5E5E5] p-2">
                <input
                  className="w-80 p-1 outline-none"
                  type={passwordEye.passwordEye2 ? "text" : "password"}
                  id="passwordRetype"
                  name="confirmPassword"
                  placeholder="Enter your password again"
                  value={registerData.confirmPassword}
                  onChange={handleChange}
                />
                <div onClick={() => handleEye(2)}>
                  <FontAwesomeIcon
                    icon={passwordEye.passwordEye2 ? faEye : faEyeSlash}
                    className="icon-color cursor-pointer"
                  />
                </div>
              </div>
              {error.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {error.confirmPassword}
                </p>
              )}
            </div>
            <div className="my-4 flex cursor-pointer flex-col">
              <input
                className="w-96 cursor-pointer bg-[#1B1C1E] p-2 text-white"
                type="submit"
                value="Sign Up"
              />
            </div>
          </form>
          <p className="icon-color -mt-2 text-center text-sm">
            Already have an account?
            <Link to={"/login"}>
              <span className="ml-1 cursor-pointer font-medium text-black">
                Log in
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
