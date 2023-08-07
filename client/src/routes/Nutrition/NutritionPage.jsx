import { useState } from "react";
import axios from "axios";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faUtensils,
  faDrumstickBite,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

// Charts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const NutritionPage = () => {
  const [query, setQuery] = useState("");
  const [nutritionFacts, setNutritionFacts] = useState(null);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProteins, setTotalProteins] = useState(0);
  const API_KEY = "duVW5E6BSkAgwi62UVJorA==xW9asge73X0q5CsP"; // Replace with your actual API key

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const fetchNutritionFacts = () => {
    axios
      .get(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
        headers: {
          "X-Api-Key": API_KEY,
        },
      })
      .then((response) => {
        setNutritionFacts(response.data.items);
        // Calculate total calories and proteins
        const totalCalories = response.data.items.reduce(
          (acc, item) => acc + item.calories,
          0,
        );
        setTotalCalories(totalCalories);
        const totalProteins = response.data.items.reduce(
          (acc, item) => acc + item.protein_g,
          0,
        );
        setTotalProteins(totalProteins);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchNutritionFacts();
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center">
      {/* Nutrition page header */}
      <div className="w-full p-4 text-center">
        <span className="h2">Nutrition Facts</span>
      </div>

      {/* Search form */}
      <div className="flex flex-col gap-x-4 gap-y-2 p-4 lg:flex-row">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter your meal here..."
          className="text-md w-[300px] rounded border p-4 shadow-md transition-all duration-500 focus:outline-none md:w-[350px] lg:w-[450px] xl:w-[650px]"
        />
        <button
          onClick={fetchNutritionFacts}
          className="min-w-[135px] cursor-pointer rounded bg-accent py-2 text-lg text-white shadow-md hover:bg-accent/90"
        >
          Get Nutrition
        </button>
      </div>

      {/* Nutrition info and charts */}
      {nutritionFacts && nutritionFacts.length > 0 && (
        <>
          <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Nutrition Containers */}
            {nutritionFacts.map((nutritionFact, index) => (
              <div
                key={index}
                className="rounded bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-[2px]"
              >
                <span className="h3 capitalize">{nutritionFact.name}</span>
                <ul className="flex flex-col items-start justify-center gap-y-2">
                  {/* List of nutrition facts */}
                  {/* Calories */}
                  <li className="flex items-center">
                    <FontAwesomeIcon
                      icon={faFire}
                      className="mr-4 text-3xl text-yellow-500"
                    />
                    <span className="mr-2 font-semibold">Calories:</span>
                    {nutritionFact.calories}
                  </li>

                  {/* Serving size */}
                  <li className="flex items-center">
                    <FontAwesomeIcon
                      icon={faUtensils}
                      className="mr-4 text-3xl text-green-500"
                    />
                    <span className="mr-2 text-lg font-semibold">
                      Serving Size:{" "}
                    </span>
                    {nutritionFact.serving_size_g} g
                  </li>

                  {/* Fat content */}
                  <li className="flex items-center">
                    <FontAwesomeIcon
                      icon={faFire}
                      className="mr-4 text-3xl text-yellow-600"
                    />
                    <span className="mr-2 text-lg font-semibold">
                      Total Fat:{" "}
                    </span>
                    {nutritionFact.fat_total_g} g
                  </li>

                  {/* Saturated fat */}
                  <li className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="mr-4 text-3xl text-yellow-600"
                    />
                    <span className="mr-2 text-lg font-semibold">
                      Saturated Fat:{" "}
                    </span>
                    {nutritionFact.fat_saturated_g} g
                  </li>

                  {/* Protein */}
                  <li className="flex items-center">
                    <FontAwesomeIcon
                      icon={faDrumstickBite}
                      className="mr-4 text-3xl text-green-600"
                    />
                    <span className="mr-2 text-lg font-semibold">
                      Protein:{" "}
                    </span>
                    {nutritionFact.protein_g} g
                  </li>

                  {/* Sodium */}
                  <li className="flex items-center">
                    <FontAwesomeIcon
                      icon={faUtensils}
                      className="mr-4 text-3xl text-blue-600"
                    />
                    <span className="mr-2 text-lg font-semibold">Sodium: </span>
                    {nutritionFact.sodium_mg} mg
                  </li>
                  {/* Add more nutrition facts as needed */}
                </ul>
              </div>
            ))}
          </div>

          {/* Nutrition Visualization */}
          <div className="my-4 rounded border bg-white p-6 shadow-md">
            {/* Header */}
            <div className="w-full pb-4 text-center">
              <span className="h3">Nutrition Visualization</span>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Calories Bar Chart */}
              <BarChart width={300} height={300} data={nutritionFacts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="calories" fill="#8884d8" name="Calories" />
              </BarChart>

              {/* Pie Chart for Total Calories and Proteins */}
              <PieChart width={300} height={300}>
                <Pie
                  data={[
                    { name: "Calories", value: Math.ceil(totalCalories) },
                    { name: "Proteins", value: Math.ceil(totalProteins) },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                >
                  <Cell fill="#82ca9d" />
                  <Cell fill="#8884d8" />
                </Pie>
                <Tooltip />
              </PieChart>

              {/* Proteins Bar Chart */}
              <BarChart width={300} height={300} data={nutritionFacts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="protein_g" fill="#82ca9d" name="Proteins (g)" />
              </BarChart>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NutritionPage;
