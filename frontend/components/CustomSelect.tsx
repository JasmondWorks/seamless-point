import React, { useState } from "react";

// const CustomSelect = ({ value, onChange, options, placeholder }) => {
//   return (
//     <div className="relative inline-block w-full">
//       <select
//         value={value}
//         onChange={onChange}
//         className="block w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2 appearance-none"
//       >
//         <option value="" disabled>
//           {placeholder}
//         </option>
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//         {/* Custom arrow icon */}
//         <svg
//           className="w-5 h-5 text-gray-400"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//           aria-hidden="true"
//         >
//           <path
//             fillRule="evenodd"
//             d="M5.23 7.21a.75.75 0 011.06 0L10 10.293l3.71-3.07a.75.75 0 011.06 1.06l-4.25 3.5a.75.75 0 01-.93 0l-4.25-3.5a.75.75 0 010-1.06z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </div>
//     </div>
//   );
// };

const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="bg-white flex border border-gray-300 rounded-md p-2 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brandSec transition duration-150 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value}
        <div className="inset-y-0 right-0 flex items-center pointer-events-none">
          {/* Custom arrow icon */}
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06 0L10 10.293l3.71-3.07a.75. 0 011.06 1.06l-4.25 3.5a.75.75 0 01-.93 0l-4.25-3.5a.75.75 0 010-1."
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="absolute max-h-64 overflow-auto mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((year) => (
            <div
              key={year}
              className="p-3 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleOptionClick(year)}
            >
              {year}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
