import React from 'react';
import CompanyFilter from './CompanyFilter';

describe('<CompanyFilter />', () => {
  it('should render companies when dropdown opens', () => {
    cy.mount(
      <CompanyFilter
        selectedCompany={'All'}
        companies={['Apple', 'Best Buy', 'IHOP']}
        onChange={() => {}}
      />
    );

    cy.get('[data-cy="company-filter"]').click();
    cy.contains('Apple').should('be.visible');
    cy.contains('Best Buy').should('be.visible');
    cy.contains('IHOP').should('be.visible');
  });

  it('should trigger onChange callback when selecting a company', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy');
    cy.mount(
      <CompanyFilter
        selectedCompany={'All'}
        companies={['Apple', 'Best Buy', 'IHOP']}
        handleCompanyChange={onChangeSpy}
      />
    );

    cy.get('[data-cy="company-filter"]').click();
    cy.contains('Apple').click();
    cy.get('@onChangeSpy').should('have.been.called');
  });
});
