import React, { useState, useRef, useEffect } from 'react';
import styles from './CompanyFilter.module.css';

export default function CompanyFilter({
  selectedCompany,
  handleCompanyChange,
  companies,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const displayValue =
    selectedCompany === 'All' ? 'All Companies' : selectedCompany;

  return (
    <div className={styles.container} ref={dropdownRef}>
      <label className={styles.label}>Company</label>
      <div
        className={styles.selector}
        onClick={() => setIsOpen(!isOpen)}
        data-cy="company-filter"
      >
        <span className={styles.selected}>{displayValue}</span>
        <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <div
            className={`${styles.option} ${selectedCompany === 'All' ? styles.active : ''}`}
            onClick={() => {
              handleCompanyChange({ target: { value: 'All' } });
              setIsOpen(false);
            }}
          >
            All Companies
          </div>
          {companies.map((company, index) => (
            <div
              key={index}
              className={`${styles.option} ${company === selectedCompany ? styles.active : ''}`}
              onClick={() => {
                handleCompanyChange({ target: { value: company } });
                setIsOpen(false);
              }}
            >
              {company}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
