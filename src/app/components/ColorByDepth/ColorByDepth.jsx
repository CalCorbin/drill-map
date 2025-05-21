import React from 'react';
import styles from './ColorByDepth.module.css';

export default function ColorByDepth({
  colorByDepth,
  handleColorByDepthChange,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id="color-by-depth"
          checked={colorByDepth}
          onChange={handleColorByDepthChange}
          className={styles.checkbox}
          data-cy="color-by-depth-checkbox"
        />
        <label htmlFor="color-by-depth" className={styles.label}>
          Color by Total Depth
        </label>
      </div>
      <div className={styles.gradientContainer}>
        <div className={styles.labelContainer}>
          <span>Shallow</span>
          <span>Deep</span>
        </div>
        <div className={styles.gradientBar} />
      </div>
    </div>
  );
}
