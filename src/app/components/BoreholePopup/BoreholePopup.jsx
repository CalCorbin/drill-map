import React from 'react';

/**
 * Creates and binds a popup to the marker layer for a borehole feature
 * @param {Object} feature - GeoJSON feature representing a borehole
 * @param {Object} layer - Leaflet layer to bind the popup to
 */
export function createBoreholePopup(feature, layer) {
  if (!feature.properties) return;

  const popupContent = generatePopupContent(feature);
  layer.bindPopup(popupContent);
}

/**
 * Generates HTML content for a borehole popup
 * @param {Object} feature - GeoJSON feature representing a borehole
 * @returns {string} HTML content for the popup
 */
export function generatePopupContent(feature) {
  return `
    <strong>Hole ID:</strong> ${feature.properties.Hole_ID || 'N/A'}<br/>
    <strong>Borehole Type:</strong> ${feature.properties['Borehole type'] || 'N/A'}<br/>
    <strong>Company:</strong> ${feature.properties.Company || 'N/A'}<br/>
    <strong>Total Depth:</strong> ${feature.properties['Total depth'] || 'N/A'}<br/>
    <strong>Coordinates:</strong> ${feature.geometry.coordinates.join(', ')}<br/>
    <strong>Year Drilled:</strong> ${feature.properties['Year Drilled'] || 'N/A'}<br/>
  `;
}
