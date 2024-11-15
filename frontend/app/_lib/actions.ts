"use server";

const URL = "https://seamless-point-one.vercel.app/api/v1";

// Create User function with proper error handling
export async function createUser(userDetails: any) {
  const response = await fetch(`${URL}/users/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetails),
  });
  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

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
  const response = await fetch(`${URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetails),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  const {
    token,
    data: { user },
  } = data;

  return { token, user };
}
