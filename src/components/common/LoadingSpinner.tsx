import { Diamond } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4">
      <div className="relative mb-6">
        <div className="animate-spin rounded-full h-16 w-16 md:h-20 md:w-20 border-4 border-yellow-400/20 border-t-yellow-400"></div>
        <Diamond className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 md:h-8 md:w-8 text-yellow-400" />
      </div>

      <h2 className="text-lg md:text-xl font-bold text-yellow-400 text-center">
        Loading Premium Collection...
      </h2>
    </div>
  );
};
