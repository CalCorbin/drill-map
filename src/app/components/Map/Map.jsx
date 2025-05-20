'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Map() {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch('/Faraday_CC_collars.geojson')
      .then((response) => response.json())
      .then((data) => {
        setGeoData(data);
      })
      .catch((error) => console.error('Error loading GeoJSON data:', error));
  }, []);

  const renderFeatureProps = (feature, layer) => {
    if (feature.properties) {
      const popupContent = `
        <strong>Hole ID:</strong> ${feature.properties.Hole_ID || 'N/A'}<br/>
        <strong>Borehole Type:</strong> ${feature.properties['Borehole type'] || 'N/A'}<br/>
        <strong>Company:</strong> ${feature.properties.Company || 'N/A'}<br/>
        <strong>Total Depth:</strong> ${feature.properties['Total depth'] || 'N/A'}<br/>
        <strong>Coordinates:</strong> ${feature.geometry.coordinates.join(', ')}<br/>
        <strong>Year Drilled:</strong> ${feature.properties['Year Drilled'] || 'N/A'}<br/>
      `;
      layer.bindPopup(popupContent);
    }
  };

  const createBoreholeMarker = (feature, coords) => {
    const marker = L.circleMarker(coords, {
      radius: 8,
      fillColor: '#3388ff',
      color: '#3388ff',
      weight: 2,
      fillOpacity: 0.7,
    });

    // Add a test id so we can reliably test markers in cypress
    marker.on('add', function () {
      if (this._path && feature.properties.Hole_ID) {
        this._path.setAttribute(
          'data-cy',
          `borehole-marker-${feature.properties.Hole_ID}`
        );
      }
    });

    return marker;
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        center={[32.75, -110.47]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData && (
          <GeoJSON
            data={geoData}
            onEachFeature={renderFeatureProps}
            pointToLayer={createBoreholeMarker}
          />
        )}
      </MapContainer>
    </div>
  );
}
