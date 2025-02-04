describe('E2E Tests for Vue.js App', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate to SortingView', () => {
    cy.visit('/')
    cy.url().should('include', '/')
    cy.contains('h1', 'Sorting Training System') // Adjust based on the actual heading in SortingView
    cy.contains('button', 'Start sorting!')
  })
})
