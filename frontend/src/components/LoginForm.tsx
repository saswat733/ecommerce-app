import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUser } from "../utils/hooks/useAuthUser"; // Import the custom hook

interface UserCredentials {
  email: string;
  password: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const { loginUser, isAuthenticated, loading, error } = useAuthUser(); // Destructure the custom hook
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginUser(credentials.email, credentials.password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      setSuccessMessage("Login successful!");
      navigate("/", { replace: true }); // Prevent going back to the login page
    }
  }, [isAuthenticated, navigate]);

  return (
    <section className="bg-white dark:bg-gray-900 h-screen w-screen">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Background"
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
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
              Log in to your account
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
              Welcome back! Please log in to continue.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
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
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-lg text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="col-span-6">
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
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-lg text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
                <Link className="underline text-red-400" to={"/email-verification"}>
                  <span className="text-red-400 text-[12px] text-nowrap flex justify-end">
                    Forgot password?
                  </span>
                </Link>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>

                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                  Don't have an account?{" "}
                  <Link to={"/signup"} className="text-gray-700 underline dark:text-gray-200">
                    Sign up
                  </Link>
                </p>
              </div>

              {error && <p className="text-red-500">{error}</p>}
              {successMessage && <p className="text-green-500">{successMessage}</p>}
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
