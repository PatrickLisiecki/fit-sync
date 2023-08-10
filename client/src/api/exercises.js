import axios from "axios";

// Get all the exercises for a user's workout on a specific week and day
export async function getExercises(userId, workoutId, week, day) {
  try {
    // Send GET request to server
    const response = await axios.get(
      `/api/exercises/${userId}/${workoutId}/${week}/${day}`,
    );

    // Extract the data from the response
    return response.data;
  } catch (error) {
    console.log("Error fetching exercises:", error);
  }
}

// Delete an exercise
export async function deleteExercise(exerciseId, authToken) {
  try {
    // Send DELETE request to server
    await axios.delete(`/api/exercises/${exerciseId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log("Error deleting exercise:", error);
  }
}
