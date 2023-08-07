import axios from "axios";
import openai from "openai";

import { useEffect, useState } from "react";

const Quiz = () => {
  const [generatedWorkout, setGeneratedWorkout] = useState("");

  const workoutOptions = [
    {
      field: "workoutType",
      question: "What type of workout do you prefer?",
      options: ["Cardio", "Strength", "Yoga", "HIIT"],
    },
    {
      field: "intensity",
      question: "How intense do you want your workout to be?",
      options: ["Light", "Moderate", "Intense"],
    },
    {
      field: "duration",
      question: "How long do you want your workout to be?",
      options: ["10 mins", "30 mins", "1 hour", "2 hours"],
    },
    {
      field: "equipment",
      question: "Do you have any exercise equipment?",
      options: ["Yes", "No"],
    },
    {
      field: "fitnessGoal",
      question: "What are your fitness goals?",
      options: [
        "Build Muscle",
        "Lose Weight",
        "Improve Flexibility",
        "Increase Endurance",
      ],
    },
    {
      field: "fitnessLevel",
      question: "What is your fitness level?",
      options: ["Beginner", "Intermediate", "Advanced"],
    },
    {
      field: "days",
      question: "How many days a week do you plan to workout?",
      options: ["3 days", "4 days", "5 days", "6 days", "7 days"],
    },
  ];

  const [answers, setAnswers] = useState({
    workoutType: null,
    intensity: null,
    duration: null,
    equipment: null,
    fitnessGoal: null,
    fitnessLevel: null,
    days: null,
  });

  useEffect(() => {
    const isAllAnswered = Object.values(answers).every(
      (answer) => answer !== null
    );
    const button = document.getElementById("generate-btn");
    if (button) {
      button.disabled = !isAllAnswered;
    }
  }, [answers]);

  const handleAnswerSelection = (questionIndex, optionIndex) => {
    setAnswers({
      ...answers,
      [workoutOptions[questionIndex].field]:
        workoutOptions[questionIndex].options[optionIndex],
    });
  };

  const generateWorkoutPlan = async () => {
    const prompt = `
    As a fitness enthusiast, I want a workout plan that fits my preferences.
    I prefer ${answers.workoutType} workouts with ${answers.intensity} intensity.
    I want the workout to be ${answers.duration} long and ${answers.equipment} equipment.
    My fitness goal is to ${answers.fitnessGoal}.
    My fitness level is ${answers.fitnessLevel}.
    I plan to work out ${answers.days} a week.
    Generate a workout plan for me.
  `;
    const OPENAI_API_KEY =
      "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";
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci/completions",
        {
          prompt: prompt,
          max_tokens: 1000,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${OPENAI_API_KEY}`,
          },
        }
      );
      //console.log("API Response:", response.data);

      const generatedPlan = response.data.choices[0].text;

      setGeneratedWorkout(generatedPlan);
    } catch (error) {
      console.error("Error generating workout plan:", error);
    }
  };

  return (
    <div className="min-h-screen py-8 ">
      <div className="bg-white max-w-2xl mx-auto rounded-lg shadow-md px-4 py-4 shadow-bs">
        <h1 className="text-4xl font-bold text-center pb-4">Workout Quiz</h1>
        {workoutOptions.map((option, questionIndex) => (
          <div key={questionIndex} className="mb-10">
            <h3 className="text-xl font-semibold mb-3">{option.question}</h3>
            <ul className="flex justify-center">
              {option.options.map((choice, optionIndex) => (
                <li key={optionIndex} className="mx-2">
                  <button
                    onClick={() =>
                      handleAnswerSelection(questionIndex, optionIndex)
                    }
                    className={`w-full px-4 py-2 rounded-lg ${
                      answers[option.field] === choice
                        ? "bg-orange-400 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                    } transition-colors duration-300 ease-in-out`}
                  >
                    {choice}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button
          id="generate-btn"
          onClick={generateWorkoutPlan}
          className={`block mx-auto px-6 py-3 rounded-lg ${
            Object.values(answers).every((answer) => answer !== null)
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-gray-400 text-gray-600 cursor-not-allowed"
          } font-semibold transition-colors duration-300 ease-in-out`}
        >
          Generate Workout Plan
        </button>
        {generatedWorkout && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">
              Generated Workout Plan
            </h3>
            <p className="bg-gray-100 p-4 rounded-lg">{generatedWorkout}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;

//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
