import { GoogleGenerativeAI } from "@google/generative-ai";

// Access the API key using REACT_APP_ prefix
const apiKey = "AIzaSyAZdfNmjdBGqBZfKvVs_RsE2sItP3hklzE"
// Check if the API key is present
if (!apiKey) {
  throw new Error("REACT_APP_GEMINI_API_KEY is not defined.");
}

// Create an instance of the GoogleGenerativeAI with the API key
const genAI = new GoogleGenerativeAI(apiKey);

// Define the model (replace "gemini-1.5-flash" with your desired model)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default model;
