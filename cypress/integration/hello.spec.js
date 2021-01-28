describe('hello cypress', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });
  it('does a thing', () => {
    expect(1).to.equal(1);
  });
  it('can visit vega chart page', () => {
    cy.get('[href="/debug"]').click();
    cy.wait(1000);
    cy.get('[data-cy="add-data"]').click();
    cy.get('[href="/vega-try"]').click();
    cy.wait(1000);
    cy.get('svg').should('exist');
  });
});
