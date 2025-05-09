import React, { useState } from "react";
import { toast } from "react-toastify";


const TimeSlotSelector = ({ onChange }) => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const addTimeSlot = () => {
    if (!startTime || !endTime) {
      toast.warn("Please fill both start and end times.");
      return;
    }

    if (startTime >= endTime) {
      toast.warn("Start time must be earlier than end time.");
      return;
    }

    const newSlot = { start: startTime, end: endTime };
    setTimeSlots((prev) => [...prev, newSlot]);
    setStartTime("");
    setEndTime("");

    if (onChange) {
      onChange([...timeSlots, newSlot]);
    }
  };

  const removeTimeSlot = (index) => {
    const updatedSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(updatedSlots);

    if (onChange) {
      onChange(updatedSlots);
    }
  };




  return (
    <div className="w-full p-4 border border-black rounded bg-white">
      <h2 className="text-xs sm:text-sm font-medium mb-4">Available Time Slots (24h Format)</h2>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div>
          <label htmlFor="startTime" className="block text-xs sm:text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => {
              setStartTime(e.target.value);
            }}
            min="0"
            max="24"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 hover:bg-gray-200 transition-all duration-300 "
          />
        </div>
        <div>
          <label htmlFor="endTime" className="block text-xs sm:text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            id="endTime"
            type="time"
            value={endTime}
            onChange={(e) => {
              setEndTime(e.target.value);
            }}
            min="0"
            max="24"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 hover:bg-gray-200 transition-all duration-300 "
          />
        </div>
        <button
          type="button"
          onClick={addTimeSlot}
          className="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition"
        >
          Add Slot
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Added Slots</h3>
        {timeSlots.length > 0 ? (
          <ul className="space-y-2">
            {timeSlots?.map((slot, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border border-gray-300 rounded-md"
              >
                <span className="text-sm">{slot.start} - {slot.end}</span>
                <button
                  type="button"
                  onClick={() => removeTimeSlot(index)}
                  className="text-red-500 text-xs sm:text-sm hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs sm:text-sm text-gray-500">No time slots added yet.</p>
        )}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
