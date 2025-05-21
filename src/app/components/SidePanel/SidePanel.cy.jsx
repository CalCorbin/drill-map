import React from 'react';
import SidePanel from './SidePanel';

describe('<SidePanel />', () => {
  it('should render side panel with filters', () => {
    cy.mount(
      <SidePanel
        selectedCompany={'TOR Fantasy'}
        handleCompanyChange={() => {}}
        companies={['TOR Fantasy', 'IHOP']}
        colorByDepth={false}
        handleColorByDepthChange={() => {}}
        selectedYear={2019}
        handleYearChange={() => {}}
        minYear={1995}
        maxYear={2025}
      />
    );

    // Company filters
    cy.contains('Company').should('be.visible');
    cy.contains('TOR Fantasy').should('be.visible');

    // Year drilled
    cy.contains('Year Drilled').should('be.visible');
    cy.contains('1995').should('be.visible');
    cy.contains('2019').should('be.visible');
    cy.contains('2025').should('be.visible');

    // Color by depth
    cy.contains('Color by Total Depth').should('be.visible');
  });
});
