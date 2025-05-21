import React from 'react';
import Map from './Map';

describe('<Map />', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.mount(<Map />);
  });

  it('should open the map and click a point', () => {
    // Assert hole data not visible on render
    cy.contains('Hole ID:').should('not.exist');
    cy.contains('REX-16-084').should('not.exist');

    // Click a point
    cy.get('[data-cy="borehole-marker-REX-16-084"]').click();

    // Assert hole ID
    cy.contains('Hole ID:').should('be.visible');
    cy.contains('REX-16-084').should('be.visible');

    // Assert borehole type
    cy.contains('Borehole Type:').should('be.visible');
    cy.contains('Diamond Drill').should('be.visible');

    // Assert company
    cy.contains('Company:').should('be.visible');
    cy.contains('Exxon').should('be.visible');

    // Assert total depth
    cy.contains('Total Depth:').should('be.visible');
    cy.contains('1156.26').should('be.visible');

    // Assert coords
    cy.contains('Coordinates:').should('be.visible');
    cy.contains('-110.4685332920297, 32.75403766833559').should('be.visible');

    // Assert year drilled
    cy.contains('Year Drilled:').should('be.visible');
    cy.contains('2016').should('be.visible');
  });

  it('should open and close a borehole point', () => {
    // Assert borehole not visible on render
    cy.contains('REX-16-084').should('not.exist');

    // Click a point
    cy.get('[data-cy="borehole-marker-REX-16-084"]').click();

    // Assert hole ID
    cy.contains('REX-16-084').should('be.visible');

    // Close popup
    cy.get('.leaflet-popup-close-button').click();
    cy.contains('REX-16-084').should('not.exist');
  });
});
