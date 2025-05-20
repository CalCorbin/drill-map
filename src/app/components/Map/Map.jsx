'use client';
import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import SidePanel from '../SidePanel/SidePanel';

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
  const [originalGeoData, setOriginalGeoData] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('All');
  const geoJsonLayerRef = useRef();

  useEffect(() => {
    fetch('/Faraday_CC_collars.geojson')
      .then((response) => response.json())
      .then((data) => {
        setOriginalGeoData(data);
        setGeoData(data);

        const uniqueCompanies = [
          ...new Set(
            data.features
              .map((feature) => feature.properties.Company)
              .filter((company) => company)
          ),
        ];
        setCompanies(uniqueCompanies);
      })
      .catch((error) => console.error('Error loading GeoJSON data:', error));
  }, []);

  useEffect(() => {
    if (!originalGeoData) return;

    let filteredData = originalGeoData;

    if (selectedCompany === 'All') {
      setGeoData(originalGeoData);
    } else {
      filteredData = {
        ...filteredData,
        features: originalGeoData.features.filter(
          (feature) => feature.properties.Company === selectedCompany
        ),
      };
      setGeoData(filteredData);
    }

    geoJsonLayerRef.current.clearLayers();
    geoJsonLayerRef.current.addData(filteredData);
  }, [selectedCompany, originalGeoData]);

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
  };

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
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <SidePanel
        selectedCompany={selectedCompany}
        handleCompanyChange={handleCompanyChange}
        companies={companies}
      />
      <div style={{ flex: 1, height: '100%' }}>
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
              ref={geoJsonLayerRef}
              key={selectedCompany}
              data={geoData}
              onEachFeature={renderFeatureProps}
              pointToLayer={createBoreholeMarker}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
}
