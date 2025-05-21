import React from 'react';
import Map from './Map';

describe('<Map />', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.mount(<Map />);
  });

  it('should open the map and click a point', () => {
    // Assert hole data not visible on render
    cy.contains('Hole ID: REX-16-084').should('not.exist');

    // Click a point
    cy.get('[data-cy="borehole-marker-REX-16-084"]').click();

    // Assert popup data
    cy.contains('Hole ID: REX-16-084').should('be.visible'); // Assert borehole type
    cy.contains('Borehole Type: Diamond Drill').should('be.visible');
    cy.contains('Company: Redhawk').should('be.visible');
    cy.contains('Total Depth: 1156.26').should('be.visible');
    cy.contains('Coordinates: -110.4685332920297, 32.75403766833559').should(
      'be.visible'
    );
    cy.contains('Year Drilled: 2016').should('be.visible');
  });

  it('should open and close a borehole point', () => {
    // Assert borehole not visible on render
    cy.contains('Hole ID: REX-16-084').should('not.exist');

    // Click a point
    cy.get('[data-cy="borehole-marker-REX-16-084"]').click();

    // Assert popup open
    cy.contains('Hole ID: REX-16-084').should('be.visible');

    // Close popup
    cy.get('.leaflet-popup-close-button').click();
    cy.contains('Hole ID: REX-16-084').should('not.exist');
  });
});
