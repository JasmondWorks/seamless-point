// // utils/auth.js
// import Cookies from "js-cookie";

// export const loginUser = () => {
//   // On successful login, set the session cookie
//   Cookies.set("user-session", "true");
// };

// export const logoutUser = () => {
//   // On logout, remove the session cookie
//   Cookies.remove("user-session");
// };

import Cookies from "js-cookie";

// Function to login the user using the API
export const loginUser = async (username, password) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Assuming the backend returns a session token or JWT
      Cookies.set("user-session", data.token, { expires: 1 }); // Set the token in a cookie (expires in 1 day)
      return true;
    } else {
      throw new Error(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};

// Function to sign up the user using the API
export const signupUser = async (username, email, password) => {
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Assuming the backend returns a session token or JWT
      Cookies.set("user-session", data.token, { expires: 1 }); // Set the token in a cookie (expires in 1 day)
      return true;
    } else {
      throw new Error(data.message || "Sign up failed");
    }
  } catch (error) {
    console.error("Sign up error:", error);
    return false;
  }
};

// Function to logout the user by removing the session cookie
export const logoutUser = () => {
  Cookies.remove("user-session");
};
