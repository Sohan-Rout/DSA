"use client";

const ArrayGenerator = ({ onGenerate }) => {
  const generateRandomArray = (size = 10, min = 5, max = 100) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
  };

  const handleGenerate = () => {
    const newArray = generateRandomArray();
    onGenerate(newArray);
  };

  return (
    <button
      onClick={handleGenerate}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 mb-2 text-sm sm:text-base"
    >
      Generate Random Array
    </button>
  );
};

export default ArrayGenerator;