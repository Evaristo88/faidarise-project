import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = "http://localhost:3000/api";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("API Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.status, error.response?.data, error.config?.url);
    return Promise.reject(error);
  }
);
const login = async (username, password) => {
  try {
    console.log("Attempting login with:", { username });
    const response = await api.post("/auth/login", { username, password });
    console.log("Login response received:", response.status);
    const { token } = response.data;
    if (token) {
      localStorage.setItem("token", token);
      return true;
    } else {
      console.error("No token received in login response");
      return false;
    }
  } catch (error) {
    console.error("Login error:", error);
    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Response data:", error.response?.data);
    }
    return false;
  }
};

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("Login form submitted:", { username });
    try {
      const success = await login(username, password);
      console.log("Login result:", success);
      if (success) {
        console.log("Login successful, redirecting to dashboard...");
        window.location.href = "/dashboard";
      } else {
        console.error("Login failed");
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login exception:", err);
      setError("Login failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "max-w-md mx-auto mt-16", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-center mb-6", children: "Login to Sports Odds Dashboard" }),
    error && /* @__PURE__ */ jsx("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4", children: error }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "username", children: "Username" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "username",
            type: "text",
            className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
            value: username,
            onChange: (e) => setUsername(e.target.value),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "password", children: "Password" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "password",
            type: "password",
            className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: `w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? "opacity-50 cursor-not-allowed" : ""}`,
          disabled: loading,
          children: loading ? "Logging in..." : "Log In"
        }
      ) }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-gray-600 text-sm mt-4", children: "Demo credentials: admin / admin123" })
    ] })
  ] }) });
};

export { LoginForm as L };
