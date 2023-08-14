/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const ExerciseContext = createContext();

const ExerciseContextProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);

  return (
    <ExerciseContext.Provider value={{ exercises, setExercises }}>
      {children}
    </ExerciseContext.Provider>
  );
};

export { ExerciseContext, ExerciseContextProvider };
