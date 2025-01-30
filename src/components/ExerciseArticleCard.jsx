import { Link } from "react-router";

function ExerciseArticleCard({ exercise }) {
    const exerciseCategory = exercise.categories?.map((category) => (
        <h2
            key={category.id}
            className="text-sm bg-blue-200 text-blue-900 font-bold px-4 py-1 rounded-lg border border-blue-300 shadow-sm hover:shadow-md transition-all duration-200">
            {category.name}
        </h2>
    ));

    return (
        <article className=" flex flex-col justify-between bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl   hover:scale-[1.02] transition-all duration-300 ease-in-out">
            <h2 className="text-2xl font-extrabold mb-3 text-gray-900 leading-snug hover:text-blue-700 transition-colors duration-200">
                {exercise.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                {exercise.description}
            </p>
            <p className="text-gray-700 font-medium mb-4">
                <span className="font-semibold">Difficulty:</span> {exercise.difficulty}
            </p>
            <Link
                to={`/exercises/${exercise.id}`}
                className=" text-white bg-[#FFA500] hover:text-[#FFA500] hover:bg-white border-4 border-[#FFA500]  text-2xl font-semibold py-2 px-6 rounded-full shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out">
                Lees meer..
            </Link>
        </article>
    );
}

export default ExerciseArticleCard;