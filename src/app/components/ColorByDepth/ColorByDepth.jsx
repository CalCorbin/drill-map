import React from 'react';

export default function ColorByDepth({
  colorByDepth,
  handleColorByDepthChange,
}) {
  return (
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
  );
}
