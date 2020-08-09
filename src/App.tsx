import React, { Component } from 'react';
import './App.css';

enum FirstDays {
  Monday = 'Monday',
  Sunday = 'Sunday',
  Saturday = 'Saturday'
}

function shiftArrayRight<T>(arr: Array<T>): Array<T> {
  // Shift all elements in the list to the right by 1 position (and move the last element to the front)
  // e.g., shift([1, 2, 3]) => [3, 1, 2]
  if (arr.length < 2)
    return arr

  const lastElement: T = arr.pop()!;
  arr.unshift(lastElement);
  return arr;
}

function saveValue(key: string, value: string) {
  // TODO: namespace these keys
  localStorage.setItem(key, value);
}

function getValue(key: string): string {
  const value = localStorage.getItem(key);
  if (value === null)
    throw new Error('No value found for key: ' + key);

  return value;
}

function getDaysList(firstDay: FirstDays) {
  // Return days of week headers for the calendar based on the 'firstDay' setting

  var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  if (firstDay === FirstDays.Monday) {
    return days;
  } else if (firstDay === FirstDays.Sunday) {
    return shiftArrayRight(days);
  } else if (firstDay === FirstDays.Saturday) {
    return shiftArrayRight(shiftArrayRight(days));
  }
}

function getFirstDayFromString(firstDay?: string) {
  let value;
  if (firstDay !== undefined)
    value = firstDay;
  else
    value = getValue('firstDay');

  try {
    return FirstDays[value as keyof typeof FirstDays];
  }
  catch (e) {
    // No saved value found, use default value
    return FirstDays.Monday;
  }
}

type CalendarProps = {}

type CalendarState = {
  firstDay: FirstDays
}

class Calendar extends Component<CalendarProps, CalendarState> {

  constructor(props: CalendarProps) {
    super(props);

    this.state = { firstDay: getFirstDayFromString() };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = getFirstDayFromString(event.target.value);
    this.setState({
      firstDay: value
    });
    saveValue('firstDay', value);
  }

  render() {
    const firstDayOptions = [];
    for (let firstDayKey in FirstDays) {
      const firstDay: FirstDays = FirstDays[firstDayKey as keyof typeof FirstDays];
      firstDayOptions.push(<option key={firstDay} value={firstDay}>{firstDay}</option>);
    }

    return (
      <div className="calendar">
        <div className="calendar-nav">
          {/*
          This will contain navigation for the calendar, like forward/back and day of week selectors
          */}
          <select value={this.state.firstDay} onChange={this.handleChange}>
            {firstDayOptions}
          </select>
        </div>

        <div className="calendar-header">
          {getDaysList(this.state.firstDay)}
        </div>

        <div className="calendar-body">
          <CalendarTable firstDay={this.state.firstDay} />
        </div>
      </div>
    );
  }
}

type CalendarTableProps = {
  firstDay: FirstDays
}

type CalendarTableState = {
  today: Date
}


class CalendarTable extends Component<CalendarTableProps, CalendarTableState> {

  constructor(props: CalendarTableProps) {
    super(props);

    this.state = { today: new Date() }
  }

  render() {
    return (
      <div>{this.props.firstDay}</div>
    )
  }
}

function App() {
  return (
    <div className="calendar-wrapper">
      <Calendar />
    </div>
  );
}

export default App;
