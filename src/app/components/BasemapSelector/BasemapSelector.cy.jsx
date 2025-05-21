import React from 'react';
import BasemapSelector from './BasemapSelector';
import { basemapOptions } from './basemapOptions';

describe('<BasemapSelector />', () => {
  beforeEach(() => {
    cy.mount(
      <BasemapSelector
        options={basemapOptions}
        selected={basemapOptions[0].id}
        onChange={() => {}}
      />
    );
  });

  it('renders correctly', () => {
    cy.get('[data-cy="basemap-dropdown"]').should('exist');
  });

  it('displays available basemap options', () => {
    cy.get('[data-cy="basemap-dropdown"]').click();
    cy.contains('OpenStreetMap').should('be.visible');
    cy.contains('OpenTopoMap').should('be.visible');
    cy.contains('ESRI World Imagery').should('be.visible');
    cy.contains('Carto Dark').should('be.visible');
  });

  it('triggers onChange callback when selecting a basemap', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy');
    cy.mount(
      <BasemapSelector
        options={basemapOptions}
        selected={basemapOptions[0].id}
        onChange={onChangeSpy}
      />
    );

    // Click on a basemap option
    cy.get('[data-cy="basemap-dropdown"]').click();
    cy.contains('ESRI World Imagery').click();
    cy.get('@onChangeSpy').should('have.been.called');
  });
});
