import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";


function ExerciseDetail() {
    // variable die je gebruikt voor de useParams moet gelijk zijn aan de route benaming
    const {id} = useParams();
    const [exercise, setExercise] = useState({});
    const exerciseCategory = exercise.categories?.map((category =>
            <p
                key={category.id}
                className=" bg-blue-100 text-blue-800 font-medium px-2 py-1  rounded-lg">
                {category.name}
            </p>
    ))
    const navigate = useNavigate();

    const deleteExercise = () => {
        async function deleteExercise() {
            try {
                const response = await fetch('http://145.24.223.145:8010/exercises/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                navigate('/');
            } catch (error) {
                console.log(error)
            }
        }

        deleteExercise()
    }


    useEffect(() => {
        async function fetchExercise() {
            try {
                // setIsLoading(false);
                const response = await fetch('http://145.24.223.145:8010/exercises/' + id, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                setExercise(data);
                // setIsLoading(true);
            } catch (error) {
                console.error('Fout bij het ophalen van het product:', error);
            }
        }

        fetchExercise();
    }, [id]);

    return (
        <>
            <div className="container w-full md:max-w-3xl mx-auto pt-[5vh]">
                {/* Title , edit and delete elements will be located here*/}
                <>
                    <div className="flex justify-between py-5">
                        <h1>{exercise.title}</h1>
                        <div className="flex items-center gap-10">
                            <button
                                className="text-white bg-[#FFA500] hover:text-[#FFA500] hover:bg-white border-4 border-[#FFA500] text-lg font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FFA500] transition-all duration-300 ease-in-out"
                                onClick={deleteExercise}>Delete
                            </button>
                            {/* Hier geef je de id mee van het enkele item. De id geef je bij Chesspot detail al door bij het linken.*/}
                            <Link to={`/exercises/${id}/edit`}
                                  className="text-white bg-[#FFA500] hover:text-[#FFA500] hover:bg-white border-4 border-[#FFA500] text-lg font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FFA500] transition-all duration-300 ease-in-out">Update</Link>
                        </div>
                    </div>
                </>
                <iframe className="w-full h-[40vh]" src={exercise.videoUrl}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                <p className="italic">{exercise.difficulty}</p>
                <p>{exercise.description}</p>
                <>
                    <div className=" flex flex-col justify-items-end py-[4vw] gap-2">
                        <h2 className="text-2xl">Muscles Targeted:</h2>
                        <div className="flex flex-col items-center gap-3">
                            {exerciseCategory}
                        </div>
                    </div>
                </>
            </div>
        </>
    )

}

export default ExerciseDetail