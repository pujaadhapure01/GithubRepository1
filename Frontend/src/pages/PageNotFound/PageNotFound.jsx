import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="px-4 lg:py-12 w-full flex justify-center items-center">
          <div className="lg:gap-20 lg:flex">
            <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
              <h1 className="font-bold text-orange-600 text-[6rem] lg:text-[20rem]">
                404
              </h1>
              <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                <span className="text-red-500">Oops!</span>{" "}
                Page Not Found
              </p>
              <p className="mb-8 text-center text-gray-500 md:text-lg">
                The page you’re looking for doesn’t exist.
              </p>
              <NavLink
                to="/"
                className="px-5 py-2 rounded-md bg-white cursor-pointer border border-black/80 hover:shadow-[2px_4px_6px_rgba(0,0,0,0.6)] transition-all duration-300 ease-in-out">
                Go home
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
