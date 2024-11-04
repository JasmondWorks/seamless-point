import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Create User function with proper error handling
export async function createUser(userDetails: any) {
  try {
    console.log(userDetails); // To check if the correct userDetails are passed
    const response = await axios.post(`${baseUrl}/users`, userDetails); // Await the axios post request
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
export async function signInUser(userDetails: any) {
  try {
    const response = await axios.get(`${baseUrl}/signin`, {
      params: userDetails, // Assuming userDetails are passed as query params
    });
    console.log(response.data); // Log the response for debugging
    return response.data; // Return the data received
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(`Axios error: ${error.message}`, error.response?.data);
    } else {
      console.log(`Non-Axios error: ${error}`);
    }
  }
}
