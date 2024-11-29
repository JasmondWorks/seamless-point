"use server";

import { getUserToken } from "@/app/_utils/server-utils";
import { cookies } from "next/headers";

const URL = "https://seamless-point-one.vercel.app/api/v1";

// Create User function with proper error handling
export async function signupUser(userDetails: any) {
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

  return { token, user };
}
export async function signupAdmin(adminDetails: any) {
  const res = await fetch(`${URL}/admins/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(adminDetails),
  });
  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  const {
    token,
    data: { user },
  } = data;

  return { token, user };
}

// Sign In User function with async/await
export async function loginUser(userDetails: {
  email: string;
  password: string;
}) {
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

  return { token, user };
}

// Google sign in
export async function signinUser(userDetails: {
  email: string;
  firstName: string;
  lastName: string;
  authType: string;
}) {
  console.log(userDetails);

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

  return { token, user };
}
export async function loginAdmin(userDetails: {
  email: string;
  password: string;
}) {
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

  return { token, user };
}

export async function forgotUserPassword(email: string) {
  console.log(email);
  const res = await fetch(`${URL}/users/forgotPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  const { status, message } = data;

  return { status, message };
}
export async function resetUserPassword(
  password: string,
  confirmPassword: string,
  resetToken: string | string[]
) {
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

  return { token, user };
}
export async function changeUserPassword(
  currPassword: string,
  password: string,
  confirmPassword: string
) {
  const storedToken = getUserToken();

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

  return { token };
}

export async function authenticateUser(token: string) {
  console.log("authenticating");
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
}

export async function authenticateAdmin(token: string) {
  console.log("authenticating");
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
}



export async function getUser() {
  const token = getUserToken();
  console.log("The token: ", token);
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

  return user;
}
export async function createDelivery(deliveryDetails: any) {
  const token = getUserToken();

  console.log(deliveryDetails);

  const res = await fetch(`${URL}/delivery`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(deliveryDetails),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  const {
    data: { delivery },
  } = data;

  return delivery;
}
