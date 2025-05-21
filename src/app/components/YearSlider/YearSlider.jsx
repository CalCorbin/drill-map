import React, { useState, useEffect } from 'react';
import styles from './YearSlider.module.css';

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
    <div className={styles.sliderContainer}>
      <label className={styles.label}>Year Drilled</label>
      <div className={styles.sliderWrapper}>
        <div className={styles.yearLabels}>
          <span>{minYear}</span>
          <span className={styles.currentYear}>{year}</span>
          <span>{maxYear}</span>
        </div>
        <input
          type="range"
          min={minYear}
          max={maxYear}
          step={1}
          value={year || ''}
          onChange={handleSliderChange}
          className={styles.slider}
          data-cy="year-slider"
        />
      </div>
    </div>
  );
}
