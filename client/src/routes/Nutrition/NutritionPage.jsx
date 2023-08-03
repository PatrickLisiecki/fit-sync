import { useState } from "react";
import axios from "axios";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHamburger,
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
                    0
                );
                setTotalCalories(totalCalories);
                const totalProteins = response.data.items.reduce(
                    (acc, item) => acc + item.protein_g,
                    0
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
        <div className="container mx-auto my-4 px-4">
            <h1 className="text-4xl font-bold mb-4">Nutrition Facts</h1>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your meal here..."
                    className="w-full px-4 py-2 border rounded-md shadow-md mr-2 focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                    onClick={fetchNutritionFacts}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md"
                >
                    Get Nutrition
                </button>
            </div>
            {nutritionFacts && nutritionFacts.length > 0 && (
                <>
                    <div className="flex space-x-4">
                        {/* Nutrition Containers */}
                        {nutritionFacts.map((nutritionFact, index) => (
                            <div
                                key={index}
                                className="border rounded-md p-6 bg-white shadow-md flex-grow"
                            >
                                <h2 className="text-2xl font-semibold mb-4">
                                    Nutrition Information - {nutritionFact.name}
                                </h2>
                                <ul>
                                    {/* List of nutrition facts */}
                                    <li className="mb-4 flex items-center">
                                        <FontAwesomeIcon
                                            icon={faHamburger}
                                            className="text-3xl mr-4 text-red-600"
                                        />
                                        <span className="font-semibold text-lg">Name: </span>
                                        {nutritionFact.name}
                                    </li>
                                    <li className="mb-4 flex items-center">
                                        <FontAwesomeIcon
                                            icon={faFire}
                                            className="text-3xl mr-4 text-yellow-500"
                                        />
                                        <span className="font-semibold text-lg">Calories: </span>
                                        {nutritionFact.calories}
                                    </li>
                                    <li className="mb-4 flex items-center">
                                        <FontAwesomeIcon
                                            icon={faUtensils}
                                            className="text-3xl mr-4 text-green-500"
                                        />
                                        <span className="font-semibold text-lg">
                                            Serving Size:{" "}
                                        </span>
                                        {nutritionFact.serving_size_g} g
                                    </li>
                                    <li className="mb-4 flex items-center">
                                        <FontAwesomeIcon
                                            icon={faFire}
                                            className="text-3xl mr-4 text-yellow-600"
                                        />
                                        <span className="font-semibold text-lg">Total Fat: </span>
                                        {nutritionFact.fat_total_g} g
                                    </li>
                                    <li className="mb-4 flex items-center">
                                        <FontAwesomeIcon
                                            icon={faCircle}
                                            className="text-3xl mr-4 text-yellow-600"
                                        />
                                        <span className="font-semibold text-lg">
                                            Saturated Fat:{" "}
                                        </span>
                                        {nutritionFact.fat_saturated_g} g
                                    </li>
                                    <li className="mb-4 flex items-center">
                                        <FontAwesomeIcon
                                            icon={faDrumstickBite}
                                            className="text-3xl mr-4 text-green-600"
                                        />
                                        <span className="font-semibold text-lg">Protein: </span>
                                        {nutritionFact.protein_g} g
                                    </li>
                                    <li className="mb-4 flex items-center">
                                        <FontAwesomeIcon
                                            icon={faUtensils}
                                            className="text-3xl mr-4 text-blue-600"
                                        />
                                        <span className="font-semibold text-lg">Sodium: </span>
                                        {nutritionFact.sodium_mg} mg
                                    </li>
                                    {/* Add more nutrition facts as needed */}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Nutrition Visualization */}
                    <div className="border rounded-md p-6 bg-white shadow-md my-4">
                        <h2 className="text-2xl font-semibold mb-4">Nutrition Visualization</h2>
                        <div className="flex flex-col lg:flex-row gap-y-4 space-x-2">
                            <div className="w-full md:w-1/2 lg:w-1/4">
                                {/* Calories Bar Chart */}
                                <BarChart
                                    width={400}
                                    height={300}
                                    data={nutritionFacts}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="calories" fill="#8884d8" name="Calories" />
                                </BarChart>
                            </div>

                            <div className="relative">
                                {/* Pie Chart for Total Calories and Proteins */}
                                <PieChart width={400} height={300}>
                                    <Pie
                                        data={[
                                            { name: "Calories", value: totalCalories },
                                            { name: "Proteins", value: totalProteins },
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
                            </div>

                            <div className="w-full md:w-1/2 lg:w-1/3">
                                {/* Proteins Bar Chart */}
                                <BarChart
                                    width={400}
                                    height={300}
                                    data={nutritionFacts}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="protein_g" fill="#82ca9d" name="Proteins (g)" />
                                </BarChart>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NutritionPage;
