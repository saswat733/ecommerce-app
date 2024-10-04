import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginRequest, loginSuccess } from "../store/authSlice";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAuthUser = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useSelector((state: any) => state.user.userInfo);
  const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    dispatch(loginRequest());
    setError(null); // Clear previous error before request

    try {
      const response = await axios.post(`${API_BASE_URL}/v1/users/login`, {
        email,
        password,
      });
      const { token, user } = response.data;
      console.log(user)
      localStorage.setItem("authToken", token);
      dispatch(loginSuccess({ token, userInfo: user }));
    } catch (error) {
      console.log("Error logging in:", error);
      setError("An error occurred during login.");
      dispatch(loginFailure("Login Failed"));
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
) => {
    setLoading(true);
    setError(null); // Clear previous error before request

    try {
        console.log("Attempting to register user:", { firstName, lastName, email }); // Log the user data

        const response = await axios.post(`${API_BASE_URL}/v1/users/register`, {
            firstname: firstName,  // Ensure the key matches your backend
            lastname: lastName,    // Ensure the key matches your backend
            email,
            password,
        });

        // Log the response
        console.log("Registration response:", response.data);

        const { token, user } = response.data;

        localStorage.setItem("authToken", token);

        dispatch(loginSuccess({ token, userInfo: user }));
    } catch (error: any) {
        console.error("Registration error:", error); // Log the full error for debugging

        if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message); // Specific server error message
        } else {
            setError("An error occurred during registration.");
        }
        dispatch(loginFailure("Registration Failed"));
    } finally {
        setLoading(false);
    }
};


  return {
    loginUser,
    registerUser,
    isAuthenticated,
    user,
    loading,
    error,
  };
};
