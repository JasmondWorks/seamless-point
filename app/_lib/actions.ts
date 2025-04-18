"use server";

import { getUserToken } from "@/app/_utils/server-utils";
import { revalidatePath } from "next/cache";

const URL = process.env.NEXT_PUBLIC_API_URL;

// Create User function with proper error handling
export async function signupUser(userDetails: any) {
  try {
    const res = await fetch(`${URL}/users/signUp`, {
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
      message: data.message || "User created successfully",
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
  try {
    const res = await fetch(`${URL}/users/login`, {
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

// Google sign in
export async function signinUser(userDetails: {
  email: string;
  firstName: string;
  lastName: string;
  authType: string;
}) {
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
  try {
    const res = await fetch(`${URL}/users/authenticate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

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
  try {
    const res = await fetch(`${URL}/admins/authenticate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

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

  try {
    const res = await fetch(`${URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    const {
      data: { user },
    } = data;

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
export async function updateUser(updatedUserInfo: any) {
  const token = getUserToken();

  try {
    const res = await fetch(`${URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUserInfo),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    revalidatePath("/user/settings");
    revalidatePath("/admin/settings");

    const {
      data: { user },
    } = data;

    return {
      status: "success",
      message: "User updated successfully",
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

export async function fetchAllDeliveries({
  page,
  limit,
  sort,
}: {
  page: number;
  limit: number;
  sort: string;
}) {
  try {
    const token = getUserToken();

    const res = await fetch(
      `${URL}/deliveries?page=${page}&limit=${limit}&sort=${sort}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "Failed to fetch deliveries",
    };
  }
}
export async function fetchDeliveries({
  page,
  limit,
  sort,
}: {
  page: number;
  limit: number;
  sort: string;
}) {
  try {
    const token = getUserToken();

    const res = await fetch(
      `${URL}/deliveries/user?page=${page}&limit=${limit}&sort=${sort}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();

    // const formattedData = formatDataDescending(data, "delivery");

    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "Failed to fetch deliveries",
    };
  }
}
export async function fetchDelivery(id: string) {
  try {
    const token = getUserToken();

    const res = await fetch(`${URL}/deliveries/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "Failed to fetch deliveries",
    };
  }
}
export async function fetchLatestDeliveries() {
  try {
    const token = getUserToken();
    const res = await fetch(`${URL}/deliveries/latest`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return { status: "success", data };
  } catch (err: any) {
    return { status: "error", message: err.message };
  }
}
export async function fetchAllCustomers({
  page,
  limit,
  sort,
}: {
  page: number;
  limit: number;
  sort: string;
}) {
  try {
    const token = getUserToken();
    const res = await fetch(
      `${URL}/users?page=${page}&limit=${limit}&sort=${sort}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (err: any) {
    return { status: "error", message: err.message };
  }
}
export async function fetchLatestCustomers() {
  try {
    const token = getUserToken();
    const res = await fetch(`${URL}/users/latest`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return { status: "success", data };
  } catch (err: any) {
    return { status: "error", message: err.message };
  }
}

export async function fetchNotifications() {
  try {
    const token = getUserToken();

    const res = await fetch(`${URL}/notifications/user`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    const formattedData = formatDataDescending(data, "notifications");

    if (!res.ok) throw new Error(data.message);

    return formattedData;
  } catch (error: any) {
    return { status: "error", message: error.message };
  }
}

export async function clearAllNotifications() {
  const token = getUserToken();
  try {
    const res = await fetch(`${URL}/notifications/user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    const { message } = data;

    return { status: "success", message };
  } catch (error: any) {
    return { status: "error", message: error.message };
  }
}

export async function markNotificationsAsRead(notificationIds: string[]) {
  const token = getUserToken();

  try {
    const res = await fetch(`${URL}/notifications/user/markAsRead`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ notificationIds: notificationIds }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return { status: "success", data };
  } catch (error: any) {
    return { status: "error", message: error.message };
  }
}

export const initiatePayment = async ({
  email,
  amount,
}: {
  email: string;
  amount: number;
}) => {
  const token = getUserToken();

  try {
    const response = await fetch(`${URL}/transactions/paystack/initialize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, amount }), // Amount in kobo
    });

    const data = await response.json();
    if (data.status) {
      return { status: "success", data: data.data.authorization_url }; // Return the URL instead of redirecting
    } else {
      console.error("Error initializing payment:", data.error);
    }
  } catch (error: any) {
    return { status: "error", message: error.message };
  }
};

export const verifyPayment = async (reference: string) => {
  const token = getUserToken();

  try {
    const response = await fetch(
      `${URL}/transactions/paystack/verify?reference=${reference}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return { status: "success", data };
  } catch (error: any) {
    return { status: "error", message: error.message };
  }
};
export const createTransaction = async ({ amount, type, reference }: any) => {
  console.log("transactionDetails");
  console.log({ amount, type });
  console.log("**********");
  try {
    const token = getUserToken();

    console.log(`${URL}/transactions/create`);

    const res = await fetch(`${URL}/transactions/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount,
        type,
        reference,
      }),
    });

    const data = await res.json();
    console.log("data");
    console.log(data);
    console.log("**********");
    if (!res.ok) throw new Error(data.message);

    return { status: "success", data };
  } catch (error: any) {
    return { status: "error", message: error.message };
  }
};

function formatDataDescending(data: any, resourceName: string) {
  const unformattedData = data.data[resourceName];
  const formattedList = unformattedData.sort(
    (a: any, b: any) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  const formattedData = {
    ...data,
    data: {
      [resourceName]: formattedList,
    },
  };

  return formattedData;
}
