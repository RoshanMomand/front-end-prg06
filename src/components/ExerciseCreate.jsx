import {useNavigate} from "react-router";
import {useEffect, useState} from "react";

function ExerciseCreate() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        videoUrl: '',
        title: '',
        description: '',
        difficulty: '',
        categories: ['']
    });
    const [categories, setCategories] = useState([]);
    useEffect(() => {
    }, [formData]);


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

    };


    const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions)
        const selectedValues = selectedOptions.map(option => option.value); // Haal de waardes van de opties op
        console.log(selectedValues);
        setFormData({
            ...formData,
            categories: selectedValues, // Update met een array van geselecteerde ID's
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Formulier verzonden:', formData);
        createExercise();
        navigate('/');
    };

    async function createExercise() {
        try {
            const response = await fetch('http://145.24.223.145:8010/exercises/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            // createSpot(data);
        } catch (error) {
            console.error('Er is een fout opgetreden:', error);
        }
    }
    useEffect(() => {
        async function fetchExercises() {
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

        fetchExercises();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Update your Info</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">Video URL:</label>
                    <input
                        type="url"
                        id="videoUrl"
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={handleInputChange}
                        placeholder="Enter the video URL"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>

                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter the title"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>

                <div>
                    <label htmlFor="description"
                           className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter a description"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty:</label>
                    <input
                        type="text"
                        id="difficulty"
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleInputChange}
                        placeholder="Enter the difficulty level"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>

                <div>
                    <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-2">Select a
                        Category:</label>
                    <select
                        id="categories"
                        name="categories"
                        multiple
                        onChange={handleCategoryChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                        {categories?.map((category) => (
                            <option key={category.id} name="categories[]" value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Verzenden */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ExerciseCreate