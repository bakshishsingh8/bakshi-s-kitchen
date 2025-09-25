import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_APP_GEMINI_API_KEY;
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
export const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// --- mapping for better Unsplash search ---
const foodMapping = {
  "Paneer Butter Masala": "Indian curry",
  "Chole Bhature": "Indian curry",
  "Rajma Chawal": "Indian curry",
  "Dal Tadka": "lentils curry",
  "Aloo Paratha": "stuffed flatbread",
  "Biryani": "rice biryani",
  "Idli": "South Indian breakfast",
  "Dosa": "South Indian dosa",
  "Samosa": "fried snack",
  "Pav Bhaji": "Indian street food",
  "Gol Gappa": "pani puri",
  "Pizza": "pizza",
  "Burger": "burger",
  "Pasta": "pasta",
  "Sandwich": "sandwich",
  "Salad": "healthy salad",
};

// helper to normalize dish names into search queries
function mapFoodQuery(name) {
  // find mapping (case-insensitive)
  const entry = Object.entries(foodMapping).find(([key]) =>
    name.toLowerCase().includes(key.toLowerCase())
  );
  return entry ? entry[1] : name; // fallback to original name
}

// helper to fetch image from Unsplash
async function fetchImageFromUnsplash(query) {
  try {
    const mappedQuery = mapFoodQuery(query);

    // first try with mapped query
    let response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(mappedQuery)}&per_page=1`,
      {
        headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
      }
    );
    let data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.small;
    }

    // second try with generic keyword "food"
    response = await fetch(
      `https://api.unsplash.com/search/photos?query=food&per_page=1`,
      {
        headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
      }
    );
    data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.small;
    }

    // final fallback → random placeholder
    return `https://picsum.photos/id/${Math.floor(Math.random() * 100) + 1}/400/300`;
  } catch (err) {
    console.error("Unsplash fetch error:", err);
    return `https://picsum.photos/id/${Math.floor(Math.random() * 100) + 1}/400/300`;
  }
}

export async function getGeminiSuggestion(searchTerm) {
  try {
    const prompt = `
      Return a JSON array of food items that match "${searchTerm}".
      Each item must include: childId, name, description, and price.

      Rules for "price":
      - Price must be a number between 50 and 500.

      Rule for "img":
      - if the dish is not found, do NOT make up an image URL.
      - don't send the Wrong img.
      - if the img is wrong not related to the search block the img and send the correct img.

      Example:
      [
        {
          "childId": "g-1",
          "name": "Veg Burger",
          "description": "Delicious burger with crispy patty.",
          "price": 120
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const startIndex = text.indexOf("[");
    const endIndex = text.lastIndexOf("]");
    if (startIndex === -1 || endIndex === -1) return [];

    const jsonString = text.substring(startIndex, endIndex + 1);
    let items = [];
    try {
      items = JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return [];
    }

    // fetch Unsplash image for each item
    const enriched = await Promise.all(
      items.map(async (item) => {
        item.img = await fetchImageFromUnsplash(item.name);
        return item;
      })
    );

    return enriched;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
}


// // src/gemini.js
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Replace this with your actual API key from Google AI Studio

// // Initialize Gemini client
// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_APP_GEMINI_API_KEY);

// // Export the model so you can use it anywhere in your app
// export const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// // Optional: helper function to ask Gemini
// export async function getGeminiSuggestion(prompt) {
//   try {
//     const result = await model.generateContent(prompt);
//     return result.response.text();
//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     return "Sorry, I couldn’t generate a suggestion.";
//   }
// }
////////////////////////////////////////////////////////////////////////////////////////////////
// src/gemini.js
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_APP_GEMINI_API_KEY);

// // Export Gemini model
// export const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// // Helper to get structured food items
// export async function getGeminiSuggestion(searchTerm) {
//   try {
//     const prompt = `
//   Return a JSON array of food items that match "${searchTerm}".
//   Each item must include: childId, name, description, price, and img (image url).

//   Rules for "img":
//   - Always return a REAL image link, not example.com.
//   - Format strictly like: "https://source.unsplash.com/400x300/?<search-term>"

//   Example:
//   [
//     {
//       "childId": "g-1",
//       "name": "Veg Burger",
//       "description": "Delicious burger with crispy patty.",
//       "price": 120,
//       "img": "https://source.unsplash.com/400x300/?Veg Burger"
//     }
//   ]
// `;

//     const result = await model.generateContent(prompt);

//     const text = result.response.text();

//     // Extract JSON safely
//     const match = text.match(/\[.*\]/s);
//     if (match) {
//       return JSON.parse(match[0]);
//     }
//     return [];
//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     return [];
//   }
// }
////////////////////////////////

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const GEMINI_API_KEY = import.meta.env.VITE_APP_GEMINI_API_KEY;

// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// export async function getGeminiSuggestion(searchTerm) {
//   try {
//     const prompt = `
//       Return a JSON array of food items that match "${searchTerm}".
//       Each item must include: childId, name, description, price, and img (image url).

//       Rules for "img":
//       - Use a REAL image link from a working service.
//       - Format strictly like: "https://picsum.photos/id/RANDOM_ID/400/300"
//       - You will replace RANDOM_ID with a number from 1 to 100 to ensure the image works.

//       Rule for "price":
//       - Price must be a number between 50 and 500.

//       Example:
//       [
//         {
//           "childId": "g-1",
//           "name": "Veg Burger",
//           "description": "Delicious burger with crispy patty.",
//           "price": 120,
//           "img": "https://picsum.photos/id/42/400/300"
//         }
//       ]
//     `;

//     const result = await model.generateContent(prompt);
//     const text = result.response.text();

//     const startIndex = text.indexOf('[');
//     const endIndex = text.lastIndexOf(']');
    
//     if (startIndex !== -1 && endIndex !== -1) {
//       const jsonString = text.substring(startIndex, endIndex + 1);
//       try {
//         return JSON.parse(jsonString);
//       } catch (e) {
//         console.error("Failed to parse JSON:", e);
//         return [];
//       }
//     }
    
//     return [];

//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     return [];
//   }
// }

