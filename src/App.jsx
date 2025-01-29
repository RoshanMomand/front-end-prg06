import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./components/Layout.jsx";
import Exercises from "./components/Exercises.jsx";
import ExerciseDetail from "./components/ExerciseDetail.jsx";
import ExerciseEdit from "./components/ExerciseEdit.jsx";
import ExerciseCreate from "./components/ExerciseCreate.jsx";

function App() {
    // Hier komt de home page
    //
    const router = createBrowserRouter([
        {
            element: <Layout/>,
            children: [
                {
                    // Homepage to greet everyone
                    // path:'/',
                    // element:

                },
                {
                    // All exercises Component. In this component we will create a article that leads us to the exercise
                    path: '/',
                    element: <Exercises/>

                },
                {
                    // In here we want will create a componenet that shows a specific detailed exercise
                    path: '/exercises/:id',
                    element: <ExerciseDetail/>
                },
                {
                    // In this child we will make a component that shows a form where we can create an article for a new exercise
                    path:'/exercises/create',
                    element:<ExerciseCreate/>
                },
                {
                    // In this child we will make a component that shows a form where we can edite an article for a existing exercise
                    path: '/exercises/:id/edit',
                    element: <ExerciseEdit/>
                }


            ]
        }
    ])

    return (
        <RouterProvider router={router}/>
    )
}

export default App
