"use client";
import { useState } from "react";

const CustomArrayInput = ({ onUseCustomArray, disabled, className }) => {
  const [customArray, setCustomArray] = useState("");

  const handleUseCustomArray = () => {
    const elements = customArray.split(",").map((el) => parseInt(el.trim()));
    if (elements.some(isNaN)) {
      alert("Please enter valid numbers separated by commas");
      return;
    }
    onUseCustomArray(elements);
  };

  return (
    <div className={`${className}`}>
      {/* Mobile layout (stacked) */}
      <div className="md:hidden flex flex-col gap-2">
        <input
          type="text"
          value={customArray}
          onChange={(e) => setCustomArray(e.target.value)}
          placeholder="Enter comma-separated numbers"
          className="w-full p-2 border rounded dark:bg-gray-700 text-sm sm:text-base"
          disabled={disabled}
        />
        <button
          onClick={handleUseCustomArray}
          disabled={disabled || !customArray}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 text-sm sm:text-base"
        >
          Use Custom Array
        </button>
      </div>

      {/* Desktop layout (side by side) */}
      <div className="hidden md:flex items-end gap-2 w-full">
        <input
          type="text"
          value={customArray}
          onChange={(e) => setCustomArray(e.target.value)}
          placeholder="Enter comma-separated numbers"
          className="flex-1 p-2 border rounded dark:bg-gray-700 text-sm sm:text-base"
          disabled={disabled}
        />
        <button
          onClick={handleUseCustomArray}
          disabled={disabled || !customArray}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 text-sm sm:text-base h-[42px]"
        >
          Use
        </button>
      </div>
    </div>
  );
};

export default CustomArrayInput;