// https://github.com/KrishK21/CS-220-Homework
import React from "react";

const years = Array.from({ length: 105 }, (_, i) => 2025 - i);

export default function DatePicker({ onDateChange }) {
  return (
    <div className="date-picker">
      <label htmlFor="year-select">Select a Year:</label>
      <select
        id="year-select"
        onChange={(e) => onDateChange(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>
          -- Choose a Year --
        </option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
