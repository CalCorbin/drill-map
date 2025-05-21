import React from 'react';
import styles from './CompanyFilter.module.css';

export default function CompanyFilter({
  selectedCompany,
  handleCompanyChange,
  companies,
}) {
  return (
    <div className={styles.container}>
      <label htmlFor="company-filter" className={styles.label}>
        Company
      </label>
      <select
        id="company-filter"
        value={selectedCompany}
        onChange={handleCompanyChange}
        className={styles.select}
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
