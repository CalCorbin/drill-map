import React from 'react';
import YearSlider from './YearSlider';

describe('<YearSlider />', () => {
  it('should render', () => {
    cy.mount(
      <YearSlider
        minYear={1950}
        maxYear={2025}
        selectedYear={2019}
        onYearChange={() => {}}
      />
    );

    cy.contains('Year Drilled').should('be.visible');
    cy.contains('1950').should('be.visible');
    cy.contains('2025').should('be.visible');
    cy.contains('2019').should('be.visible');
  });
});
