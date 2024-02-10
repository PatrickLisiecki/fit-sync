import axios from "axios";

// Create a set
export async function createSet(newData) {
  try {
    // Send POST request to server
    const response = await axios.post(`/api/sets/`, newData);

    // Extract the data from the response
    return response.data;
  } catch (error) {
    console.error("Error creating new set:", error);
  }
}

// Get all sets for an exercise
export async function getSets(exerciseId) {
  try {
    // Send GET request to server
    const response = await axios.get(`/api/sets/${exerciseId}`);

    // Extract the data from the response
    return response.data;
  } catch (error) {
    console.error("Error fetching sets:", error);
  }
}

// Updating a set
export async function updateSet(setId, newData) {
  try {
    // Send PUT request to server
    const response = await axios.put(`/api/sets/${setId}`, newData);

    // Extract the data from the response
    return response.data;
  } catch (error) {
    console.error("Error updating set:", error);
  }
}

// Delete a set
export async function deleteSet(setId) {
  try {
    // Send DELETE request to server
    await axios.delete(`/api/sets/${setId}`);
  } catch (error) {
    console.error("Error deleting set:", error);
  }
}
