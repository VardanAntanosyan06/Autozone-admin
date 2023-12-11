// Filter.js
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import image from "./calendar.png";
import "./Filter.css";

const Filter = ({ onFilterButtonClick }) => {
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const onChangeValue = (value) => {
    setValue(value.target.value);
  };

  const handleButtonClick = () => {
    onFilterButtonClick(value, date);
  };

  return open ? (
    <div>
      <div id="closed">
        <input
          type="text"
          placeholder="Որոնել"
          onChange={onChangeValue}
          value={value}
        />
        <img src={image} onClick={() => setOpen(!open)} />
        <button id="button" onClick={handleButtonClick}>
          Հաստատել
        </button>
      </div>
      <div className="calendar-container" style={{ position: "absolute" }}>
        <div className="calendar-wrapper">
          <Calendar onChange={onChange} value={date} />
        </div>
      </div>
    </div>
  ) : (
    <div id="closed">
      <input
        type="text"
        placeholder="Որոնել"
        onChange={onChangeValue}
        value={value}
      />
      <img src={image} onClick={() => setOpen(!open)} />
      <button id="button" onClick={handleButtonClick}>
        Հաստատել
      </button>
    </div>
  );
};

export default Filter;
