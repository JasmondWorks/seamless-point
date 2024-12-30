"use server";

import { getUserToken } from "@/app/_utils/server-utils";

const URL = process.env.NEXT_PUBLIC_API_URL;

// Create User function with proper error handling
export async function signupUser(userDetails: any) {
  console.log("***********");
  console.log(userDetails);
  console.log("***********");
  try {
    const res = await fetch(`${URL}/users/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
    const data = await res.json();

    console.log(data);

    if (!res.ok) throw new Error(data.message);

    const {
      token,
      data: { user },
    } = data;

    return {
      status: "success",
      message: "User created successfully",
      token,
      user,
    };
  } catch (error: any) {
    return { status: "error", message: error.message };
  }
}
export async function signupAdmin(userDetails: any) {
  try {
    const res = await fetch(`${URL}/admins/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    const {
      token,
      data: { user },
    } = data;

    return {
      status: "success",
      message: "Admin created successfully",
      token,
      user,
    };
  } catch (error: any) {
    return {
      status: "error",
      message:
        error.message.includes("fetch") || error.message.includes("failed")
          ? "Check your internet connection"
          : error.message,
    };
  }
}

// Sign In User function with async/await
export async function loginUser(userDetails: {
  email: string;
  password: string;
}) {
  console.log("Login Data Sent:", userDetails);
  try {
    const res = await fetch(`${URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    const data = await res.json();

    console.log("Login Response:", data);
    if (!res.ok) throw new Error(data.message);

    const {
      token,
      data: { user },
    } = data;

    return {
      status: "success",
      message: "User logged in successfully",
      token,
      user,
    };
  } catch (error: any) {
    return {
      status: "error",
      message:
        error.message.includes("fetch") || error.message.includes("failed")
          ? "Check your internet connection"
          : error.message,
    };
  }
}

// Google sign in
export async function signinUser(userDetails: {
  email: string;
  firstName: string;
  lastName: string;
  authType: string;
}) {
  console.log(userDetails);

  try {
    const res = await fetch(`${URL}/users/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    const {
      token,
      data: { user },
    } = data;

    return {
      status: "success",
      message: "User logged in successfully",
      token,
      user,
    };
  } catch (error: any) {
    return {
      status: "error",
      message:
        error.message.includes("fetch") || error.message.includes("failed")
          ? "Check your internet connection"
          : error.message,
    };
  }
}
export async function signinAdmin(userDetails: {
  email: string;
  firstName: string;
  lastName: string;
  authType: string;
}) {
  try {
    const res = await fetch(`${URL}/admins/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    console.log(res);

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    const {
      token,
      data: { user },
    } = data;

    return {
      status: "success",
      message: "Admin logged in successfully",
      token,
      user,
    };
  } catch (error: any) {
    return {
      status: "error",
      message:
        error.message.includes("fetch") || error.message.includes("failed")
          ? "Check your internet connection"
          : error.message,
    };
  }
}
export async function loginAdmin(userDetails: {
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(`${URL}/admins/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    const {
      token,
      data: { user },
    } = data;

    return {
      status: "success",
      message: "Admin logged in successfully",
      token,
      user,
    };
  } catch (error: any) {
    return {
      status: "error",
      message:
        error.message.includes("fetch") || error.message.includes("failed")
          ? "Check your internet connection"
          : error.message,
    };
  }
}

export async function forgotUserPassword(email: string) {
  console.log(email);
  try {
    const res = await fetch(`${URL}/users/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    const { status: serverStatus, message } = data;

    return { serverStatus, status: "success", message };
  } catch (error: any) {
    return {
      status: "error",
      message:
        error.message.includes("fetch") || error.message.includes("failed")
          ? "Check your internet connection"
          : error.message,
    };
  }
}
export async function resetUserPassword(
  password: string,
  confirmPassword: string,
  resetToken: string | string[]
) {
  try {
    const res = await fetch(`${URL}/users/resetPassword?token=${resetToken}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, confirmPassword }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    const {
      token,
      data: { user },
    } = data;

    return {
      status: "success",
      message: "Password reset successfully",
      token,
      user,
    };
  } catch (error: any) {
    return {
      status: "error",
      message:
        error.message.includes("fetch") || error.message.includes("failed")
          ? "Check your internet connection"
          : error.message,
    };
  }
}
export async function changeUserPassword(
  currPassword: string,
  password: string,
  confirmPassword: string
) {
  const storedToken = getUserToken();

  try {
    const res = await fetch(`${URL}/users/updateMyPassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify({ currPassword, password, confirmPassword }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    const { token } = data;

    return {
      status: "success",
      message: "Password updated successfully",
      token,
    };
  } catch (error: any) {
    return {
      status: "error",
      message:
        error.message.includes("fetch") || error.message.includes("failed")
          ? "Check your internet connection"
          : error.message,
    };
  }
}

export async function authenticateUser(token: string) {
  console.log("authenticating");
  try {
    const res = await fetch(`${URL}/users/authenticate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) throw new Error(data.message);
    return {
      status: "success",
      message: "User authenticated successfully",
    };
  } catch (error: any) {
    return {
      status: "error",
      message:
        error.message.includes("fetch") || error.message.includes("failed")
          ? "Check your internet connection"
          : error.message,
    };
  }
}

export async function authenticateAdmin(token: string) {
  console.log("authenticating");
  try {
    const res = await fetch(`${URL}/admins/authenticate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) throw new Error(data.message);
    return { status: "success", message: "Admin authenticated successfully" };
  } catch (error: any) {
    return {
      status: "error",
      message:
        error.message.includes("fetch") || error.message.includes("failed")
          ? "Check your internet connection"
          : error.message,
    };
  }
}

export async function getUser() {
  const token = getUserToken();
  console.log("The token: ", token);
  try {
    const res = await fetch(`${URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    console.log(data);

    if (!res.ok) throw new Error(data.message);

    const {
      data: { user },
    } = data;

    console.log("user is ", user);

    return {
      status: "success",
      message: "User fetched successfully",
      user,
    };
  } catch (error: any) {
    return {
      status: "error",
      message:
        error.message.includes("fetch") || error.message.includes("failed")
          ? "Check your internet connection"
          : error.message,
    };
  }
}
export async function createDelivery(deliveryDetails: any) {
  const token = getUserToken();

  try {
    const res = await fetch(`${URL}/deliveries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(deliveryDetails),
    });

    const data = await res.json();

    console.log(data);

    const {
      data: { delivery },
    } = data;

    if (!res.ok) throw new Error(data.message);

    return {
      status: "success",
      message: "Delivery created successfully",
      delivery,
    };
  } catch (error: any) {
    return {
      status: "error",
      message:
        error.message.includes("fetch") || error.message.includes("failed")
          ? "Check your internet connection"
          : error.message,
    };
  }
}

export async function fetchDeliveries(page: number = 1, limit: number = 10) {
  try {
    const token = getUserToken();

    console.log(token);
    const res = await fetch(
      `${URL}/deliveries/user?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();

    console.log("*********");
    console.log(data);
    console.log("*********");

    if (!res.ok) throw new Error(data.message);

    return { status: "success", data };
  } catch (error) {
    return { status: "error", message: "Failed to fetch deliveries" };
  }
}

export async function fetchNotifications() {
  console.log("fetchNotifications is being called"); // Debug log

  try {
    const token = getUserToken();

    Array.from({ length: 5 }, () => console.log("*****"));

    const res = await fetch(`${URL}/notifications/user`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    console.log("*********");
    console.log(data);
    console.log("*********");

    if (!res.ok) throw new Error(data.message);

    return { status: "success", data };
  } catch (error) {
    return { status: "error", message: "Failed to fetch notifications" };
  }
}
