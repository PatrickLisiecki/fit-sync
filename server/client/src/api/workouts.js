import axios from "axios";

// Get all the workouts for a user
export async function getWorkouts(userId) {
  try {
    // Send GET request to server
    const response = await axios.get(`/api/workouts/${userId}`);

    // Extract the data from the response
    return response.data;
  } catch (error) {
    console.error("Error fetching workouts:", error);
  }
}

// Create a workout for a user
export async function createWorkout(userId, newData) {
  try {
    // Send POST request to server
    const response = await axios.post(`/api/workouts/${userId}`, {
      name: newData,
      userId: userId,
    });

    // Extract the data from the response
    return response.data;
  } catch (error) {
    console.error("Error saving new workout:", error);
  }
}

// Updating a workout for a user
export async function updateWorkout(workoutId, newData) {
  try {
    // Send PUT request to server
    const response = await axios.put(`/api/workouts/${workoutId}`, {
      name: newData,
    });

    // Extract the data from the response
    return response.data;
  } catch (error) {
    console.error("Error updating workout:", error);
  }
}

// Delete a workout
export async function deleteWorkout(workoutId) {
  try {
    // Send DELETE request to server
    await axios.delete(`/api/workouts/${workoutId}`);
  } catch (error) {
    console.error("Error deleting workout:", error);
  }
}
