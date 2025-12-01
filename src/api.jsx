import axios from "axios";

// GET: Real News API
export const newsApi = axios.create({
  baseURL: "https://newsapi.org/v2",
  params: { apiKey: "YOUR_NEWS_API_KEY" },
});

// POST/PUT/DELETE: JSONPlaceholder fake API
export const fakeApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts",
});
