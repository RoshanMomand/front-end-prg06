import {Link} from "react-router";
import {Outlet} from "react-router";

function Layout() {
    return (
        <div>
            <header className="sticky z-10 top-0 bg-[#242424]">
                <nav className="group flex justify-evenly items-center pb-10">
                    <>
                        <div className="flex items-center">
                            <img src="/src/img.png" alt="" className=" w-[5vw]"/>
                            <h1 className="text-2xl">Exercise Wikipedia</h1>
                        </div>
                    </>


                    {/* Be aware you need to change the routes in the back end!!!!!! */}
                    <>
                        <div className="flex gap-10">
                            <Link
                                className=" active: text-[#FFA500] text-2xl hover:scale-110 border-2 border-white rounded-3xl  p-[1rem] hover:text-white hover:bg-[#FFA500]   transition duration-[1000] ease-in-out"
                                to={`/`}>All Exercises</Link>
                            <Link
                                className="text-[#FFA500] text-2xl hover:scale-110 border-2 border-white  rounded-3xl  p-[1rem] hover:text-white   hover:bg-[#FFA500] transition duration-[1000] ease-in-out "
                                to={`/exercises/create`}>Create New Chess Spot</Link>
                        </div>
                    </>
                </nav>

            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}

export default Layout;