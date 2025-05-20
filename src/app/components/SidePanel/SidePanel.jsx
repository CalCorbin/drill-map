import React from 'react';

export default function SidePanel({
  selectedCompany,
  handleCompanyChange,
  companies,
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
        <h3 style={{ margin: '0 0 15px 0' }}>Filters</h3>
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
      </div>
    </div>
  );
}
