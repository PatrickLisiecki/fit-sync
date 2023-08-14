import axios from "axios";

// Create an exercise
export async function createExercise(
  userId,
  day,
  name,
  type,
  muscle,
  equipment,
  difficulty,
  details,
  week,
  workoutId,
) {
  try {
    // Send POST request to server
    const response = await axios.post(
      "/api/exercises/",
      {
        userId: userId,
        day: day,
        name: name,
        type: type,
        muscle: muscle,
        equipment: equipment,
        difficulty: difficulty,
        details: details,
        week: week,
        workoutId: workoutId,
      },
      { withCredentials: true },
    );

    // Extract the data from the response
    return response.data;
  } catch (error) {
    console.log("Error creating exercise:", error);
  }
}

// Get a specific exercise
export async function getExercise(exerciseId) {
  try {
    // Send GET request to server
    const response = await axios.get(`/api/exercises/exercise/${exerciseId}`);

    // Extract the data from the response
    return response.data;
  } catch (error) {
    console.log("Error fetching exercise:", error);
  }
}

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
