import React from 'react';
import GeoJSONPanel from './GeoJSONPanel';

describe('<GeoJSONPanel />', () => {
  const testGeoData = {
    type: 'FeatureCollection',
    name: 'Middle_Earth_Locations',
    crs: {
      type: 'name',
      properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
    },
    features: [
      {
        type: 'Feature',
        properties: {
          Hole_ID: 'MOR-01',
          Azimuth: 360.0,
          Inclination: -90.0,
          'Borehole type': 'Dwarven Mine',
          Company: "Durin's Folk",
          'Total depth': 441.96,
          'Coordinates.Grid': 'Middle Earth Grid',
          Easting: 550082.15,
          Northing: 3623730.41,
          Elevation: 1350.57,
          Location: 'Moria',
          Resource: 'Mithril',
        },
        geometry: {
          type: 'Point',
          coordinates: [-110.465383605737046, 32.750284432427939],
        },
      },
      {
        type: 'Feature',
        properties: {
          Hole_ID: 'ERE-02',
          Azimuth: 51.23,
          Inclination: -86.33,
          'Borehole type': 'Elven Shaft',
          Company: 'Woodland Realm',
          'Total depth': 610.21,
          'Coordinates.Grid': 'Middle Earth Grid',
          Easting: 549033.67,
          Northing: 3623351.82,
          Elevation: 1286.76,
          Location: 'Erebor',
          Resource: 'Arkenstone',
        },
        geometry: {
          type: 'Point',
          coordinates: [-110.476595471921982, 32.74691665473074],
        },
      },
      {
        type: 'Feature',
        properties: {
          Hole_ID: 'GON-03',
          Azimuth: 336.0,
          Inclination: -60.0,
          'Borehole type': 'Gondorian Excavation',
          Company: 'Minas Tirith Mining',
          'Total depth': 304.8,
          'Coordinates.Grid': 'Middle Earth Grid',
          Easting: 548963.5,
          Northing: 3623289.45,
          Elevation: 1267.73,
          Location: 'Osgiliath',
          Resource: 'White Stone',
        },
        geometry: {
          type: 'Point',
          coordinates: [-110.477347751995964, 32.746357179992231],
        },
      },
    ],
  };

  it('should render panel with data', () => {
    cy.mount(<GeoJSONPanel geoData={testGeoData} />);

    // Companies
    cy.contains('Woodland Realm').should('be.visible');
    cy.contains(/Durin's Folk/).should('be.visible');
    cy.contains('Minas Tirith Mining').should('be.visible');

    // Hole ID
    cy.contains('ERE-02').should('be.visible');
    cy.contains('MOR-01').should('be.visible');
    cy.contains('GON-03').should('be.visible');

    // Depth
    cy.contains('610.21').should('be.visible');
    cy.contains('441.96').should('be.visible');
    cy.contains('304.8').should('be.visible');
  });
});
