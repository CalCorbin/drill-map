import React from 'react';

export default function BasemapSelector({ options, selected, onChange }) {
  return (
    <div
      className="basemap-selector"
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        backgroundColor: 'white',
        color: '#333333',
        padding: '10px',
        borderRadius: '4px',
        boxShadow: '0 1px 5px rgba(0,0,0,0.65)',
      }}
    >
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
