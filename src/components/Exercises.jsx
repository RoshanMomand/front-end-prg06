import {useEffect, useState} from "react";
import ExerciseArticleCard from "./ExerciseArticleCard.jsx";
function Exercises() {
    const [exercises,setExercises] = useState([]);
    useEffect(() => {
        async function fetchExercises() {
            try {
                // setIsLoading(false);
                const response = await fetch('http://145.24.223.145:8010/exercises',{
                    method:'GET',
                    headers:{
                        'Accept':'application/json'
                    }
                });
                const data = await response.json();
                setExercises(data.items);
                // setIsLoading(true);
            } catch (error) {
                console.error('Fout bij het ophalen van het product:', error);
            }
        }
        fetchExercises();
    }, []);

    const exerciseDetails =exercises?.map((exercise =>
            // the key exercise is giving through the props from the component in the
            // exercise detail
            <ExerciseArticleCard key={exercise.id} exercise={exercise}/>
    ));



    return(
        <div className="grid grid-cols-2 grid-rows-2 gap-8 m-auto w-1/2">
            {exerciseDetails}
        </div>
    )
}

export default Exercises;