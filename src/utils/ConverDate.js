const converDate = (date) => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleString('en-GB', {
    day: 'numeric',  // e.g., "16"
    month: 'long',   // e.g., "June"
    year: 'numeric', // e.g., "2025"
    hour: '2-digit', // e.g., "09"
    minute: '2-digit', // e.g., "30"
  })
  return formattedDate
}

const converToJustDate = (date) => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleString('en-GB', {
    day: 'numeric',  // e.g., "16"
    month: 'long',   // e.g., "June"
    year: 'numeric', // e.g., "2025"
  })
  return formattedDate
}


const getStartEndDate = (filter) => {
  const today = new Date();
  let startDate, endDate;

  switch (filter) {
    case "today":
      startDate = new Date(today.setHours(0, 0, 0, 0));
      endDate = new Date();
      break;
    case "thisWeek":
      // Create a copy of today to avoid modifying original
      let thisWeekStart = new Date(today);
      thisWeekStart.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
      startDate = thisWeekStart;

      // Set end date to Saturday of current week
      let thisWeekEnd = new Date(thisWeekStart);
      thisWeekEnd.setDate(thisWeekStart.getDate() + 6);
      endDate = thisWeekEnd;
      break;

    case "lastWeek":
      // Create a copy of today for last week's start
      let lastWeekStart = new Date(today);
      lastWeekStart.setDate(today.getDate() - today.getDay() - 7); // Start of last week (Sunday)
      startDate = lastWeekStart;

      // Set end date to Saturday of last week
      let lastWeekEnd = new Date(lastWeekStart);
      lastWeekEnd.setDate(lastWeekStart.getDate() + 6); // Saturday of last week
      endDate = lastWeekEnd;
      break;
    case "thisMonth":
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      break;
    case "lastMonth":
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      endDate = new Date(today.getFullYear(), today.getMonth(), 0);
      break;
    case "thisYear":
      startDate = new Date(today.getFullYear(), 0, 1);
      endDate = new Date(today.getFullYear(), 11, 31);
      break;
    case "lastYear":
      startDate = new Date(today.getFullYear() - 1, 0, 1);
      endDate = new Date(today.getFullYear() - 1, 11, 31);
      break;
    default:
      return { startDate: null, endDate: null }; // "All Time" option
  }

  if (startDate) startDate.setHours(0, 0, 0, 0);
  if (endDate) endDate.setHours(23, 59, 59, 999);

  startDate = startDate ? startDate.toISOString() : null;
  endDate = endDate ? endDate.toISOString() : null;

  return { startDate, endDate };
};





export { converDate, converToJustDate, getStartEndDate };