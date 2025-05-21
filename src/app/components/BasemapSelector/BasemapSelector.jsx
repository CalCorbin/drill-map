import React from 'react';
import styles from './BasemapSelector.module.css';

export default function BasemapSelector({ options, selected, onChange }) {
  return (
    <div className={styles.basemapSelector}>
      <label htmlFor="basemap-select">Basemap: </label>
      <select
        id="basemap-select"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        data-testid="basemap-select"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
