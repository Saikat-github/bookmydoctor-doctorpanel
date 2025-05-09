import React, { useContext, useState } from "react";
import DaySelector from './DaySelector';
import TimeSlotSelector from './TimeSlotSelector';
import { DoctorContext } from "../../context/DoctorContext";



const DaySlotWithTimeSlots = () => {
    const {selectedDays, setSelectedDays, timeSlotsByDay, setTimeSlotsByDay} = useContext(DoctorContext);


  const handleDayChange = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
      delete timeSlotsByDay[day]; // Remove time slots for the deselected day
    } else {
      setSelectedDays([...selectedDays, day]);
      setTimeSlotsByDay({ ...timeSlotsByDay, [day]: [] }); // Add an empty array for the selected day
    }
  };

  const handleTimeSlotChange = (day, newTimeSlots) => {
    setTimeSlotsByDay({ ...timeSlotsByDay, [day]: newTimeSlots });
  };

  return (
    <div className="flex flex-col gap-4">
      <DaySelector selectedDays={selectedDays} handleDayChange={handleDayChange} />
      {selectedDays?.map((day) => (
        <div key={day}>
          <h3>{day}</h3>
          <TimeSlotSelector
            onChange={(newTimeSlots) => handleTimeSlotChange(day, newTimeSlots)}
          />
        </div>
      ))}
    </div>
  );
};

export default DaySlotWithTimeSlots;