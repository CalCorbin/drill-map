import React, { useState, useEffect } from 'react';

export default function YearSlider({
  minYear,
  maxYear,
  selectedYear,
  onYearChange,
}) {
  const [year, setYear] = useState(selectedYear || maxYear);

  useEffect(() => {
    if (selectedYear && selectedYear !== year) {
      setYear(selectedYear);
    }
  }, [selectedYear]);

  const handleSliderChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setYear(newYear);
    if (onYearChange) {
      onYearChange(newYear);
    }
  };

  return (
    <div
      style={{
        margin: '15px 0',
        padding: '10px 0',
      }}
    >
      <h3 style={{ marginBottom: '10px' }}>Year Drilled</h3>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '5px',
          }}
        >
          <span>{minYear}</span>
          <span style={{ fontWeight: 'bold' }}>{year}</span>
          <span>{maxYear}</span>
        </div>
        <input
          type="range"
          min={minYear}
          max={maxYear}
          step={1}
          value={year || ''}
          onChange={handleSliderChange}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
}
