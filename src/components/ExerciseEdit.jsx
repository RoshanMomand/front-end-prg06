import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";

function ExerciseEdit() {

    const {id} = useParams();
    const [exercise, setExercise] = useState({
        videoUrl: '',
        title: '',
        description: '',
        difficulty: '',
        categories: [],
    })
    const [categories, setCategories] = useState([]);
    const selectedCategory = exercise.categories?.map((category =>
                category.name
    ))


    const navigate = useNavigate();

    useEffect(() => {
        async function fetchSpot() {
            try {
                // Hier vraag je de informatie op van de id waar je op hebt geklikt. De id geef je mee bij een enkele Exercise. Hierdoor kan ik de waardes weergeven op het formulier
                const response = await fetch('http://145.24.223.145:8010/exercises/' + id, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                setExercise(data)
            } catch (error) {
                console.error('Fout bij het ophalen van het product:', error);
            }
        }

        fetchSpot();
    }, [id]);


    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('http://145.24.223.145:8010/categories', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Fout bij het ophalen van het product:', error);
            }
        }

        fetchCategories();
    }, []);
    const valueInputChange = (event) => {
        const {name,value} = event.target
        setExercise({...exercise,[name]:value})
    }
    const onCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions)
        const selectedValues = selectedOptions.map(option => option.value); // Haal de waardes van de opties op
        setExercise({
            ...exercise,
            categories: selectedValues, // Update met een array van geselecteerde ID's
        });
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        updateForm();
        navigate('/')

    }
    async function updateForm(){
        try {
    const response = await fetch('http://145.24.223.145:8010/exercises/'+id,{

                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(exercise)
            });
            const data = await response.json()
            setExercise(data)
            console.log(setExercise)
        }
        catch (error){
            console.log(error)
        }
    }

    return (
        <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4 ">Update your Info</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">Video URL:</label>
                        <input
                            type="url"
                            id="videoUrl"
                            name="videoUrl"
                            value={exercise.videoUrl}
                            onChange={valueInputChange}
                            placeholder="Enter the video URL"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                    </div>

                    {/* Titel */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={exercise.title}
                            onChange={valueInputChange}
                            placeholder="Enter the title"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                    </div>

                    {/* Beschrijving */}
                    <div>
                        <label htmlFor="description"
                               className="block text-sm font-medium text-gray-700">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={exercise.description}
                            onChange={valueInputChange}
                            placeholder="Enter a description"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="difficulty"
                               className="block text-sm font-medium text-gray-700">Difficulty:</label>
                        <input
                            type="text"
                            id="difficulty"
                            name="difficulty"
                            value={exercise.difficulty}
                            onChange={valueInputChange}
                            placeholder="Enter the difficulty level"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <h1>Current Muscles groups: </h1>
                        <p>{selectedCategory}</p>
                        <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-2">Select a
                            Category:</label>
                        <select
                            id="categories"
                            name="categories[]"
                            multiple
                            onChange={onCategoryChange}
                            className=" accent-[FFA500] block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                            {categories?.map((category) => (
                                <option key={category.id} name="categories[]" value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                        Submit
                    </button>
                </form>
        </div>
    )
}

export default ExerciseEdit