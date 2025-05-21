import React from 'react';
import CompanyFilter from '../CompanyFilter/CompanyFilter';
import ColorByDepth from '../ColorByDepth/ColorByDepth';
import YearSlider from '../YearSlider/YearSlider';
import styles from './SidePanel.module.css';

export default function SidePanel({
  selectedCompany,
  handleCompanyChange,
  companies,
  colorByDepth,
  handleColorByDepthChange,
  selectedYear,
  handleYearChange,
  minYear,
  maxYear,
}) {
  return (
    <div className={styles.sidePanel}>
      <div className={styles.contentContainer}>
        <h2 className={styles.title}>Filters</h2>
        <CompanyFilter
          selectedCompany={selectedCompany}
          handleCompanyChange={handleCompanyChange}
          companies={companies}
        />
        <YearSlider
          minYear={minYear}
          maxYear={maxYear}
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
        />
        <ColorByDepth
          colorByDepth={colorByDepth}
          handleColorByDepthChange={handleColorByDepthChange}
        />
      </div>
    </div>
  );
}
