import React from 'react';

export default function CompanyFilter({
  selectedCompany,
  handleCompanyChange,
  companies,
}) {
  return (
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
  );
}
