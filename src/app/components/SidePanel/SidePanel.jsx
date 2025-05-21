import React from 'react';

export default function SidePanel({
  selectedCompany,
  handleCompanyChange,
  companies,
  colorByDepth,
  handleColorByDepthChange,
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
        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="company-filter"
            style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
            }}
          >
            Company
          </label>
          <select
            id="company-filter"
            value={selectedCompany}
            onChange={handleCompanyChange}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}
            data-cy="company-filter"
          >
            <option value="All">All Companies</option>
            {companies.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        {/* Add color by depth control */}
        <div style={{ marginBottom: '20px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <input
              type="checkbox"
              id="color-by-depth"
              checked={colorByDepth}
              onChange={handleColorByDepthChange}
              style={{ marginRight: '8px' }}
              data-cy="color-by-depth-checkbox"
            />
            <label htmlFor="color-by-depth" style={{ fontWeight: 'bold' }}>
              Color by Total Depth
            </label>
          </div>
          <div style={{ marginTop: '10px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
              }}
            >
              <span>Shallow</span>
              <span>Deep</span>
            </div>
            <div
              style={{
                height: '20px',
                width: '100%',
                background:
                  'linear-gradient(to right, #2c7bb6, #abd9e9, #ffffbf, #fdae61, #d7191c)',
                borderRadius: '4px',
                marginTop: '4px',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
