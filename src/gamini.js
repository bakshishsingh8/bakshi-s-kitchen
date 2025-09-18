// src/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Replace this with your actual API key from Google AI Studio

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_APP_GEMINI_API_KEY);

// Export the model so you can use it anywhere in your app
export const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Optional: helper function to ask Gemini
export async function getGeminiSuggestion(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn’t generate a suggestion.";
  }
}
