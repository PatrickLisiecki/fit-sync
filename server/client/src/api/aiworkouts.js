import axios from "axios";

// Get AI workouts for a user
export async function getAIWorkouts(userId) {
  try {
    // Send GET request to server
    const response = await axios.get(`/api/aiworkouts/${userId}`);

    // Extract the data from the response
    return response.data;
  } catch (error) {
    console.error("Error fetching exercises:", error);
  }
}
