import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";


function ExerciseDetail(){
    // variable die je gebruikt voor de useParams moet gelijk zijn aan de route benaming
    const {id} = useParams();
    const [exercise,setExercise] = useState({});
    const exerciseCategory = exercise.categories?.map((category =>
            <p
                key={category._id}
                className="text-sm bg-blue-100 text-blue-800 font-medium px-2 py-1 rounded-lg">
            {category.name}
        </p>
    ))
    const navigate = useNavigate();

    const deleteExercise = () => {
        async function deleteExercise(){
            try {
    const response = await fetch('http://145.24.223.145:8010/exercises/'+id,{
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                navigate('/');
            }catch (error){
                console.log(error)
            }
        }
        deleteExercise()
    }


    useEffect(() => {
        async function fetchExercise() {
            try {
                // setIsLoading(false);
                const response = await fetch('http://145.24.223.145:8010/exercises/'+id,{
                    method:'GET',
                    headers:{
                        'Accept':'application/json'
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

    return(
        <div>
            <video src={exercise.videoUrl}></video>
            <p>{exercise.title}</p>
            <p>{exercise.description}</p>
            <p>{exercise.difficulty}</p>
            <p>{exerciseCategory}</p>
            <button onClick={deleteExercise}>Delete</button>
            {/* Hier geef je de id mee van het enkele item. De id geef je bij Chesspot detail al door bij het linken.*/}
            <Link to={`/exercises/${id}/edit`}>Update</Link>
        </div>

    )

}
export default ExerciseDetail