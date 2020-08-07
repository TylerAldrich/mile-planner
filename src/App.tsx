import React from 'react';
import './App.css';

enum FirstDays {
  Monday,
  Sunday,
  Saturday
}

function shiftArrayLeft<T>(arr: Array<T>): Array<T> {
  // Shift all elements in the list to the left by 1 position (and move the first element to the end)
  // e.g., shift([1, 2, 3]) => [2, 3, 1]
  if (arr.length < 2)
    return arr

  let firstElement: T = arr.shift()!;
  arr.push(firstElement);
  return arr;
}

function getDaysList(firstDay: FirstDays) {
  // Return days of week headers for the calendar based on the 'firstDay' setting

  var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  if (firstDay === FirstDays.Monday) {
    return days;
  } else if (firstDay === FirstDays.Sunday) {
    return shiftArrayLeft(days);
  } else if (firstDay === FirstDays.Saturday) {
    return shiftArrayLeft(shiftArrayLeft(days));
  }
}


function Calendar() {
  const firstDay = FirstDays.Monday; // TODO: This should be changeable and read from local storage

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    // TODO: Update local storage with new setting

    console.log(getDaysList(firstDay));
  };

  return (
    <div className="calendar">
      <div className="calendar-nav">
        {/*
          This will contain navigation for the calendar, like forward/back and day of week selectors
        */}
      </div>
      <select value={firstDay} onChange={handleChange}>
        {Object.keys(FirstDays).map(day => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
    </div>
  );
}


function App() {
  return (
    <div className="calendar-wrapper">
      <Calendar />
    </div>
  );
}

export default App;
