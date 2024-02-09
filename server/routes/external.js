const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();
const { OpenAIApi, Configuration } = require("openai");

router.get("/nutrition", async (req, res) => {
  const { query } = req.query;
  const API_KEY = process.env.NUTRI_API;

  try {
    const response = await axios.get(
      `https://api.calorieninjas.com/v1/nutrition?query=${query}`,
      {
        headers: {
          "X-Api-Key": API_KEY,
        },
      },
    );

    // Process the response and extract necessary data
    const nutritionFacts = response.data.items;
    // Calculate total calories and proteins
    const totalCalories = nutritionFacts.reduce(
      (acc, item) => acc + item.calories,
      0,
    );
    const totalProteins = nutritionFacts.reduce(
      (acc, item) => acc + item.protein_g,
      0,
    );

    res.json({ nutritionFacts, totalCalories, totalProteins });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching nutrition data." });
  }
});

router.get("/exercises", async (req, res) => {
  const { muscle, difficulty } = req.query;
  const API_KEY = process.env.NINJA_API;

  try {
    const response = await axios.get(
      "https://api.api-ninjas.com/v1/exercises",
      {
        headers: {
          "X-Api-Key": API_KEY,
        },
        params: {
          muscle,
          difficulty,
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching exercises from external API:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching exercises." });
  }
});

router.post("/generateplan", async (req, res) => {
  const { answers } = req.body;

  try {
    if (!answers) {
      return res
        .status(400)
        .json({ error: "Missing answers in the request body." });
    }

    const prompt = `As a fitness enthusiast, I want a workout plan that fits my preferences.
      I prefer ${answers.workoutType} workouts with ${answers.intensity} intensity.
      I want the workout to be ${answers.duration} long and ${answers.equipment} equipment.
      My fitness goal is to ${answers.fitnessGoal}.
      My fitness level is ${answers.fitnessLevel}.
      I plan to work out ${answers.days} a week.
      Generate a workout plan for me.`;

    // Generate workout plan using OpenAI
    const apiKey = process.env.GPT_API;

    const openAi = new OpenAIApi(
      new Configuration({
        apiKey,
      }),
    );

    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a fitness enthusiast seeking a workout plan.",
        },
        { role: "user", content: prompt },
      ],
    });

    if (!response.data.choices || response.data.choices.length === 0) {
      return res.status(500).json({ error: "No response from OpenAI." });
    }

    const generatedPlan = response.data.choices[0]?.message?.content;

    console.log(response.data.choices[0]?.message?.content);

    if (!generatedPlan) {
      return res
        .status(500)
        .json({ error: "Generated workout plan is empty." });
    }

    res.json({ generatedPlan });
  } catch (error) {
    console.error("Error generating workout plan:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the workout plan." });
  }
});

module.exports = router;
