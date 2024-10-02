import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

console.log('API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SignForm() {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

   
    try {
      const response = await axios.post(`${API_BASE_URL}/users/register`, {
        firstname: userDetails.firstName,
        lastname: userDetails.lastName,
        email: userDetails.email,
        password: userDetails.password,
      });

      console.log("Response:", response);
      if (response.status === 201) {
        setSuccessMessage("Registration successful!");
        setErrorMessage("");
        setUserDetails({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      setErrorMessage("An error occurred during registration.");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 h-screen w-screen">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Background"
            src="https://img.freepik.com/free-vector/men-going-food-shopping_74855-1362.jpg?ga=GA1.1.1587082835.1713296226&semt=ais_hybrid"
            className="absolute inset-0 h-full w-full  object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block text-blue-600" href="#">
              <span className="sr-only">Home</span>
              <svg
                className="h-8 sm:h-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG Path */}
              </svg>
            </a>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
              Create an account
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
              Let's get you started. Please provide your details to sign up.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  First Name
                </label>

                <input
                  type="text"
                  id="FirstName"
                  name="firstName"
                  value={userDetails.firstName}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-lg text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="LastName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Last Name
                </label>

                <input
                  type="text"
                  id="LastName"
                  name="lastName"
                  value={userDetails.lastName}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-lg text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-lg text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  value={userDetails.password}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-lg text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                >
                  Sign Up
                </button>

                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                  Already have an account?{" "}
                  <Link to={'/login'} className="text-gray-700 underline dark:text-gray-200">
                    Log in
                  </Link>
                </p>
              </div>
              {errorMessage && <p>{errorMessage}</p>}
              {successMessage && <p>{successMessage}</p>}
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
