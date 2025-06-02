import { Diamond } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="relative mb-8">
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-yellow-400/20 border-t-yellow-400"></div>
        <Diamond className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-yellow-400" />
      </div>
      <h2 className="text-xl font-bold text-yellow-400 tracking-wider">
        Loading Premium Collection...
      </h2>
    </div>
  );
};
