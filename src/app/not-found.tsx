import React from "react";

const Custom404 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">
          404 - Page Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default Custom404;
