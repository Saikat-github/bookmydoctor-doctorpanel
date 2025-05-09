import React from 'react';

const DaySelector = ({ selectedDays, handleDayChange}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // const toggleDay = (day) => {
  //   if (selectedDays.includes(day)) {
  //     onChange(selectedDays.filter(d => d !== day));
  //   } else {
  //     onChange([...selectedDays, day]);
  //   }
  // };

  return (
    <div className="relative w-full">
      {/* Dropdown Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='py-2 px-3 border border-gray-700 w-full  rounded-sm mt-2 cursor-pointer'
      >
        <div className='flex items-center'>
          {selectedDays.length > 0 ? (
            <div>{selectedDays.join(', ')}</div>
          ) :
          <span className='text-gray-400'>Select Available Days</span>}
          <span className="ml-2">▼</span>
        </div>

      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 border rounded-md bg-white shadow-lg z-10">
          {days.map(day => (
            <label
              key={day}
              className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedDays.includes(day)}
                onChange={() => handleDayChange(day)}
                className="mr-2"
              />
              {day}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default DaySelector;
