// LoadingSpinner.tsx
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    // <div className="flex items-center justify-center min-h-screen">
    //   <div className="relative w-24 h-24">
    //     <div className="absolute w-full h-full border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
    //     <div className="absolute w-full h-full border-4 border-b-transparent border-red-500 rounded-full animate-spin-reverse"></div>
    //     <div className="absolute w-3/4 h-3/4 m-auto inset-0 border-4 border-l-transparent border-green-500 rounded-full animate-spin"></div>
    //     <div className="absolute w-1/2 h-1/2 m-auto inset-0 border-4 border-r-transparent border-yellow-500 rounded-full animate-spin-reverse"></div>
    //   </div>
    // </div>
    <div className="fixed inset-0 flex items-center justify-center">
      <img
        loading="lazy"
        src="./animatedcarloading.gif"
        width={200}
        height={200}
        alt="Loading animation"
      />
    </div>  );
};

export default LoadingSpinner;
