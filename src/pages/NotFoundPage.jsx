import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <img
        src="https://static.zara.net/photos///contents/mkt/spots/ss23-north-man-new/subhome-xmedia-22//w/3024/IMAGE-landscape-fill-9ab89f23-66e2-44af-91b9-e604699f90f6-default_0.jpg?ts=1685551364166"
        alt=""
        className="object-cover w-full h-64"
      />

      <div className="flex items-center justify-center flex-1">
        <div className="max-w-xl px-4 py-8 mx-auto text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            We can't find that page.
          </h1>

          <p className="mt-4 text-gray-500 mb-5">
            Try searching again, or return home to start from the beginning.
          </p>

          <Link to="/">
            <button className="bg-black text-white p-5 rounded-xl">
              Go Back Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
