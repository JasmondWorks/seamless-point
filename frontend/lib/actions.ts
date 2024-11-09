import axios from "axios";

const URL = "https://seamless-point-one.vercel.app/api/v1";

// Create User function with proper error handling
export async function createUser(userDetails: any) {
  try {
    console.log(userDetails); // To check if the correct userDetails are passed
    const response = await axios.post(`${URL}/users`, userDetails); // Await the axios post request
    console.log(response); // Log the response for debugging
    return response.data; // Return the response data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(`Axios error: ${error.message}`, error.response?.data); // Log the actual error message
    } else {
      console.log(`Non-Axios error: ${error}`);
    }
  }
}

// Sign In User function with async/await
export async function loginUser(userDetails: {
  email: string;
  password: string;
}) {
  try {
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
  } catch (error) {}
}
