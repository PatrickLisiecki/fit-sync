import { useEffect, useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import Sidebar from "../Dashboard/Sidebar";

const Quiz = () => {
  const workoutOptions = [
    {
      field: "workoutType",
      question: "What type of workout do you prefer?",
      options: ["Cardio", "Strength Training", "Yoga", "HIIT"],
    },
    {
      field: "intensity",
      question: "How intense do you want your workout to be?",
      options: ["Light", "Moderate", "Intense"],
    },
    {
      field: "duration",
      question: "How long do you want your workout to be?",
      options: ["10 minutes", "30 minutes", "1 hour", "2 hours"],
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
        "Tone Up",
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

  const generateWorkoutPlan = () => {
    // logic here to generate the workout plan based on the user's answers
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-semibold text-center pb-4">
            Workout Quiz
          </h1>
          {workoutOptions.map((option, questionIndex) => (
            <div key={questionIndex} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{option.question}</h3>
              <ul className="flex justify-center">
                {option.options.map((choice, optionIndex) => (
                  <li key={optionIndex} className="mx-2">
                    <button
                      onClick={() =>
                        handleAnswerSelection(questionIndex, optionIndex)
                      }
                      className={`px-4 py-2 rounded-lg ${
                        answers[option.field] === choice
                          ? "bg-orange-400 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-200"
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
            disabled
            className={`block mx-auto px-6 py-3 rounded-lg ${
              Object.values(answers).every((answer) => answer !== null)
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-gray-400 text-gray-600 cursor-not-allowed"
            } font-semibold transition-colors duration-300 ease-in-out`}
          >
            Generate Workout Plan
          </button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
