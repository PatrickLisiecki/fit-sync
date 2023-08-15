/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";

// API functions
import { getAIWorkouts } from "../../api/aiworkouts";

const Quiz = () => {
  const [generatedWorkout, setGeneratedWorkout] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedWorkouts, setSavedWorkouts] = useState([]);

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
        "Tone Up Muscles",
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
      (answer) => answer !== null,
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

  useEffect(() => {
    const fetchSavedWorkouts = async () => {
      try {
        const response = await axios.get("/api/aiworkouts");
        const fetchedWorkouts = response.data;
        setSavedWorkouts(fetchedWorkouts);
      } catch (error) {
        console.error("Error fetching saved workouts:", error);
      }
    };

    fetchSavedWorkouts();
  }, []);

  const generateWorkoutPlan = async () => {
    setLoading(true);

    try {
      const response = await axios.post("/api/external/generateplan", {
        answers,
      });
      const generatedPlan = response.data.generatedPlan;
      setGeneratedWorkout(generatedPlan);

      try {
        const backendResponse = await axios.post("/api/aiworkouts", {
          workout: generatedPlan,
        });
        const storedAIworkout = backendResponse.data;
        console.log("AI workout plan stored:", storedAIworkout);
      } catch (backendError) {
        console.error("Error storing workout plan in backend:", backendError);
      }
    } catch (generationError) {
      console.error("Error generating workout plan:", generationError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mb-8 w-[65%]">
      <div className="w-full p-4 text-center">
        <span className="h2">Workout Quiz</span>
      </div>
      <div className="w-full rounded-lg bg-white px-4 py-4 shadow-md dark:bg-secondary dark:shadow-none">
        {workoutOptions.map((option, questionIndex) => (
          <div key={questionIndex} className="mb-10">
            <span className="h3 font-semibold">{option.question}</span>
            <ul
              className={`flex ${
                option.field
              }-options ${"flex-col justify-center gap-x-4 md:flex-col lg:flex-row"}`}
            >
              {" "}
              {/* Use a conditional class */}
              {option.options.map((choice, optionIndex) => (
                <li
                  key={optionIndex}
                  className={`my-2 ${optionIndex !== 0 && "sm:ml-0"}`}
                >
                  {" "}
                  {/* Use a conditional class */}
                  <button
                    onClick={() =>
                      handleAnswerSelection(questionIndex, optionIndex)
                    }
                    className={`${
                      answers[option.field] === choice
                        ? "bg-accent text-white hover:bg-accent/90"
                        : "bg-gray-100 text-primary hover:bg-gray-300 hover:shadow-xl"
                    } w-full min-w-[130px] rounded px-4 py-2 transition-all duration-300 ease-in-out`}
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
          className={`mx-auto block rounded px-6 py-3 ${
            Object.values(answers).every((answer) => answer !== null)
              ? "bg-accent text-white hover:bg-accent/90"
              : "cursor-not-allowed bg-gray-400 text-secondary"
          } w-full font-semibold uppercase tracking-wide transition-colors duration-300 ease-in-out`}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Workout Plan"}
        </button>
        {loading ? (
          <div className="grid min-h-[150px] w-full place-items-center">
            <svg
              aria-hidden="true"
              className="inline h-[50px] w-[50px] animate-spin fill-accent text-gray-400 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          generatedWorkout && (
            <div className="mt-6">
              <span className="h3 font-semibold">Generated Workout Plan</span>
              <div className="whitespace-pre-line rounded-lg bg-gray-100 p-4 dark:bg-primary">
                {generatedWorkout}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Quiz;
