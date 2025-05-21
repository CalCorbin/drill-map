import React from 'react';
import ColorByDepth from './ColorByDepth';

describe('<ColorByDepth />', () => {
  it('should render with checkbox not toggled', () => {
    cy.mount(
      <ColorByDepth colorByDepth={false} handleColorByDepthChange={() => {}} />
    );
    cy.get('[data-cy="color-by-depth-checkbox"]').should('not.be.checked');
  });

  it('should render with checkbox toggled', () => {
    cy.mount(
      <ColorByDepth colorByDepth={true} handleColorByDepthChange={() => {}} />
    );
    cy.get('[data-cy="color-by-depth-checkbox"]').should('be.checked');
  });

  it('should trigger onChange callback when clicking checkbox', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy');
    cy.mount(
      <ColorByDepth
        colorByDepth={false}
        handleColorByDepthChange={onChangeSpy}
      />
    );

    cy.get('[data-cy="color-by-depth-checkbox"]').click();
    cy.get('@onChangeSpy').should('have.been.called');
  });
});
