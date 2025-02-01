import {useEffect, useState} from "react";
import ExerciseArticleCard from "./ExerciseArticleCard.jsx";

function Exercises() {
    const [exercises, setExercises] = useState([]);
    const [originalExercises, setOriginalExercises] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    // const [categories, setCategories] = useState([]);
    // const [selectedCategory, setSelectedCategory] = useState('');
    useEffect(() => {
        async function fetchExercises() {
            try {
                // setIsLoading(false);
                const response = await fetch('http://145.24.223.145:8010/exercises', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                setOriginalExercises(data.items);
                setExercises(data.items);

            } catch (error) {
                console.error('Fout bij het ophalen van het product:', error);
            }
        }

        fetchExercises();
    }, []);

    // Fetch all categories to display them
    // useEffect(() => {
    //     async function fetchCategories() {
    //         try {
    //             const response = await fetch('http://145.24.223.145:8010/categories', {
    //                 method: 'GET',
    //                 headers: {
    //                     'Accept': 'application/json'
    //                 }
    //             });
    //             const data = await response.json();
    //             setCategories(data);
    //         } catch (error) {
    //             console.error('Fout bij het ophalen van het product:', error);
    //         }
    //     }
    //
    //     fetchCategories();
    // }, []);


    // const categoryFilter = (selectedCategory) => {
    //     console.log(selectedCategory)
    //     const filteredItems = exercises.filter((exercise) => {
    //         console.log(exercise.categories.map((category) => category.id))
    //         return exercise.categories.map((category) => category.id).includes(selectedCategory);
    //         // return exercise.categories.includes(selectedCategory);
    //     })
    //     setExercises(filteredItems)
    // }
    // this outputs the name of the categories -> I want to filter this through a select and option
    const handleSearch = (e) => {
        // e.preventDefault()
        const searchVal = e.target.value.toLowerCase();
        setSearchVal(searchVal);

        const filtered = originalExercises.filter((exercise) => {
            return (
                exercise.title.toLowerCase().includes(searchVal) ||
                exercise.description.toLowerCase().includes(searchVal)
            );
        });

        setExercises(filtered);
    };



    return (
        <>
            <div className="pt-20 w-1/2 m-auto">
                <form className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                    <div className="flex flex-col">
                        {/*<label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-2">Select a*/}
                        {/*    Category:</label>*/}
                        {/*<select multiple onChange={(e) => categoryFilter(e.target.value)} name="categories" id="categories">*/}
                        {/*    <option selected disabled>Select a category</option>*/}
                        {/*    {categories.map((category) =>*/}
                        {/*        <option*/}
                        {/*            name="categories"*/}
                        {/*            key={category.id}*/}
                        {/*            value={category.id}>*/}
                        {/*            {category.name}*/}
                        {/*        </option>*/}
                        {/*    )}*/}
                        {/*</select>*/}
                        <label
                            htmlFor="search"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Zoek een titel of omschrijving:
                        </label>
                        <input
                            value={searchVal}
                            onChange={handleSearch}
                            id="search"
                            type="text"
                            placeholder="Voer een titel of omschrijving in.."
                            className="w-full border border-gray-300 rounded-lg p-3 text-white-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </form>
            </div>

            {/* Gebruik mt-8 (of meer als je meer ruimte wilt) om meer afstand toe te voegen */}
            <div className="grid grid-cols-2 grid-rows-2 gap-8 m-auto w-1/2 mt-8">
                {exercises.length > 0 ? (
                    exercises.map((exercise) => (
                        <ExerciseArticleCard key={exercise.id} exercise={exercise}/>
                    ))
                ) : (
                    <p>Geen resultaten gevonden.</p>
                )}
            </div>
        </>
    )
}

export default Exercises;