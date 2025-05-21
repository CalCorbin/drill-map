'use client';
import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import SidePanel from '../SidePanel/SidePanel';
import BasemapSelector from '../BasemapSelector/BasemapSelector';
import { createBoreholePopup } from '../BoreholePopup/BoreholePopup';
import { getColorByDepth } from './functions/getColorByDepth';
import { basemapOptions } from '../BasemapSelector/basemapOptions';

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
  const [colorByDepth, setColorByDepth] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [minYear, setMinYear] = useState(null);
  const [maxYear, setMaxYear] = useState(null);
  const [selectedBasemap, setSelectedBasemap] = useState(basemapOptions[0].id);

  const geoJsonLayerRef = useRef();

  useEffect(() => {
    fetch('/Faraday_CC_collars.geojson')
      .then((response) => response.json())
      .then((data) => {
        setOriginalGeoData(data);
        setGeoData(data);

        // Extract companies
        const uniqueCompanies = [
          ...new Set(
            data.features
              .map((feature) => feature.properties.Company)
              .filter((company) => company)
          ),
        ];
        setCompanies(uniqueCompanies);

        // Calculate min and max years
        const years = data.features
          .map((feature) =>
            feature.properties['Year Drilled']
              ? feature.properties['Year Drilled']
              : null
          )
          .filter((year) => year !== null);

        if (years.length > 0) {
          setMinYear(Math.min(...years));
          setMaxYear(Math.max(...years));
          setSelectedYear(Math.max(...years));
        }
      })
      .catch((error) => console.error('Error loading GeoJSON data:', error));
  }, []);

  useEffect(() => {
    if (!originalGeoData) return;

    let filteredData = {
      ...originalGeoData,
      features: originalGeoData.features.filter((feature) => {
        // Company filter
        const companyMatch =
          selectedCompany === 'All' ||
          feature.properties.Company === selectedCompany;

        // Year filter
        const yearMatch =
          !selectedYear ||
          (feature.properties['Year Drilled'] &&
            feature.properties['Year Drilled'] <= selectedYear);

        return companyMatch && yearMatch;
      }),
    };

    setGeoData(filteredData);

    if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.clearLayers();
      geoJsonLayerRef.current.addData(filteredData);
    }
  }, [selectedCompany, selectedYear, originalGeoData]);

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleBasemapChange = (basemapId) => {
    setSelectedBasemap(basemapId);
  };

  const currentBasemap = basemapOptions.find(
    (basemap) => basemap.id === selectedBasemap
  );

  const handleColorByDepthChange = (e) => {
    setColorByDepth(e.target.checked);

    if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.clearLayers();
      geoJsonLayerRef.current.addData(geoData);
    }
  };

  const renderFeatureProps = (feature, layer) => {
    createBoreholePopup(feature, layer);
  };

  const createBoreholePoints = (feature, coords) => {
    const depth = feature.properties['Total depth'];
    const fillColor = colorByDepth ? getColorByDepth(depth) : '#3388ff';

    const marker = L.circleMarker(coords, {
      radius: 8,
      fillColor: fillColor,
      color: fillColor,
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
        colorByDepth={colorByDepth}
        handleColorByDepthChange={handleColorByDepthChange}
        selectedYear={selectedYear}
        handleYearChange={handleYearChange}
        minYear={minYear}
        maxYear={maxYear}
        selectedBasemap={selectedBasemap}
        handleBasemapChange={handleBasemapChange}
      />
      <div style={{ flex: 1, height: '100%' }}>
        <MapContainer
          center={[32.75, -110.47]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution={currentBasemap.attribution}
            url={currentBasemap.url}
            maxZoom={currentBasemap.maxZoom}
          />
          {geoData && (
            <GeoJSON
              ref={geoJsonLayerRef}
              key={colorByDepth ? 'colored' : 'default'}
              data={geoData}
              onEachFeature={renderFeatureProps}
              pointToLayer={createBoreholePoints}
            />
          )}
        </MapContainer>
        <BasemapSelector
          options={basemapOptions}
          selected={selectedBasemap}
          onChange={handleBasemapChange}
        />
      </div>
    </div>
  );
}
