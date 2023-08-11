import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import React from "react";
import Model from "react-body-highlighter";

function formatExercises(exercises) {
  const formattedExercises = exercises.map((exercise, index) => (
    <div key={index}>{exercise}</div>
  ));

  return formattedExercises;
}

export default function DashboardHome() {
  const { currentUser } = useContext(AuthContext);
  const data = [
    {
      name: "The triceps muscles are located on the back of your upper arm and are crucial for extending your elbow, aiding in movements like tricep dips and push-ups.",
      muscles: ["triceps"],
    },
    {
      name: "The chest muscles, or pectorals, are essential for pushing movements. They play a significant role in exercises like bench presses and push-ups.",
      muscles: ["chest"],
    },
    {
      name: "The trapezius muscles, often called traps, are located at the upper part of your back and play a crucial role in shoulder movement and stability.",
      muscles: ["trapezius"],
    },
    {
      name: "The upper back muscles, including the rhomboids and middle trapezius, help support good posture and shoulder blade movement.",
      muscles: ["upper-back"],
    },
    {
      name: "The lower back muscles, also known as the erector spinae, provide support to your spine and help maintain proper alignment during various movements.",
      muscles: ["lower-back"],
    },
    {
      name: "The biceps muscles are responsible for elbow flexion and forearm supination, which are important for exercises like curls and pull-ups.",
      muscles: ["biceps"],
    },
    {
      name: "The forearm muscles help with gripping and wrist movements, supporting exercises involving weights, bars, and other equipment.",
      muscles: ["forearm"],
    },
    {
      name: "These muscles, located at the back of the shoulders, contribute to shoulder joint stability and assist in pulling movements.",
      muscles: ["back-deltoids"],
    },
    {
      name: "The front deltoids are responsible for shoulder flexion and play a role in exercises like overhead presses and front raises.",
      muscles: ["front-deltoids"],
    },
    {
      name: "The abdominal muscles, commonly referred to as abs, provide core stability and help with various movements like crunches and planks.",
      muscles: ["abs"],
    },
    {
      name: "The oblique muscles, both internal and external, are located on the sides of your abdomen and assist in rotating and bending your torso.",
      muscles: ["obliques"],
    },
    {
      name: "The adductor muscles are located on the inner thigh and play a role in bringing your legs together.",
      muscles: ["adductor"],
    },
    {
      name: "The hamstring muscles are located at the back of the thigh and are important for knee flexion and hip extension.",
      muscles: ["hamstring"],
    },
    {
      name: "The quadriceps muscles, often called quads, are located on the front of the thigh and are involved in knee extension.",
      muscles: ["quadriceps"],
    },
    {
      name: "The abductor muscles help move your legs away from the midline of your body, supporting lateral movements.",
      muscles: ["abductors"],
    },
    {
      name: "The calf muscles, or gastrocnemius and soleus, are essential for ankle plantar flexion and are targeted in calf raises.",
      muscles: ["calves"],
    },
    {
      name: "The gluteal muscles, including the gluteus maximus, medius, and minimus, are responsible for hip extension and play a vital role in movements like squats and lunges.",
      muscles: ["gluteal"],
    },
    {
      name: "While there aren't specific exercises to target the muscles in your head, maintaining good posture during workouts is crucial to avoid strain on your neck and head muscles. Remember to keep your neck in alignment with your spine and engage your core to provide support. Staying hydrated and practicing relaxation techniques can also contribute to overall head health.",
      muscles: ["head"],
    },
    {
      name: "While not commonly targeted directly in workouts, neck exercises can help strengthen the neck muscles, supporting head stability and reducing the risk of injuries.",
      muscles: ["neck"],
    },
    {
      name: "Although there are no direct exercises to target the knees, it's essential to prioritize knee joint health to support your overall fitness journey. Strengthening the muscles around your knees, such as quadriceps and hamstrings, can provide stability and reduce the risk of injury. Focus on leg exercises like squats and lunges that engage these muscles, and always warm up properly before your workouts to promote knee flexibility and mobility.",
      muscles: ["knees"],
    },
    {
      name: "Situated in the lower leg, the soleus muscle is essential for maintaining balance and stability. It assists in ankle flexion, providing power for movements like running and jumping. Strengthening the soleus through exercises such as calf raises enhances lower leg strength, aiding athletic performance and overall stability.",
      muscles: ["left-soleus"],
    },
    {
      name: "Situated in the lower leg, the soleus muscle is essential for maintaining balance and stability. It assists in ankle flexion, providing power for movements like running and jumping. Strengthening the soleus through exercises such as calf raises enhances lower leg strength, aiding athletic performance and overall stability.",
      muscles: ["right-soleus"],
    },
  ];

  const [activeModel, setActiveModel] = useState("front");
  const [clickedMuscle, setClickedMuscle] = useState(null);

  const handleClick = React.useCallback(({ muscle, data }) => {
    const { exercises, frequency } = data;
    setClickedMuscle({ muscle, exercises, frequency });
  }, []);

  return (
    <div className="mb-8 flex h-full w-full flex-col items-center">
      {/* Dashboard home header */}
      <div className="w-full p-4 text-center">
        <span className="h2">Welcome, {currentUser.username}!</span>
      </div>
      <div className="flex w-[90%] flex-col items-center justify-center rounded-lg bg-white px-4 py-4 shadow-md dark:bg-primary md:w-[50%] lg:w-[60%]">
        {activeModel === "front" && (
          <Model
            data={data}
            style={{
              width: "15rem",
            }}
            onClick={handleClick}
            highlightedColors={["#FFB869"]}
          />
        )}
        {activeModel === "back" && (
          <Model
            data={data}
            style={{
              width: "15rem",
            }}
            onClick={handleClick}
            type="posterior"
            highlightedColors={["#FFB869"]}
          />
        )}

        <button
          className="mt-4 rounded bg-accent px-4 py-3 text-white hover:bg-accent/90"
          onClick={() =>
            setActiveModel(activeModel === "front" ? "back" : "front")
          }
        >
          Toggle Model
        </button>

        {clickedMuscle && (
          <div className="mt-4 text-center">
            <div className="h3 text-black">
              You clicked the {clickedMuscle.muscle}!
            </div>
            <div className="text-black">
              {formatExercises(clickedMuscle.exercises)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
