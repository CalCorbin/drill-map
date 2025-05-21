import React from 'react';
import CompanyFilter from '../CompanyFilter/CompanyFilter';
import ColorByDepth from '../ColorByDepth/ColorByDepth';
import YearSlider from '../YearSlider/YearSlider';

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
    <div
      style={{
        width: '16rem',
        height: '100%',
        color: '#333333',
        background: 'white',
        transition: 'width 0.3s ease',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '15px', overflowY: 'auto' }}>
        <h2 style={{ margin: '0 0 15px 0' }}>Filters</h2>
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
