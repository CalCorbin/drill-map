import React, { useState } from 'react';
import styles from './BasemapSelector.module.css';

export default function BasemapSelector({ options, selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.id === selected);

  return (
    <div className={styles.basemapSelector}>
      <div
        className={styles.selector}
        onClick={() => setIsOpen(!isOpen)}
        data-cy="basemap-dropdown"
      >
        <span className={styles.label}>Basemap</span>
        <span className={styles.selected}>{selectedOption?.name}</span>
        <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {options.map((option) => (
            <div
              key={option.id}
              className={`${styles.option} ${option.id === selected ? styles.active : ''}`}
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
              data-cy={`basemap-option-${option.id}`}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
