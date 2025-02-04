describe('E2E Tests for AppDialog Component', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should open dialog when value is true', () => {
    // Assuming there's a way to set the value prop to true in the test
    cy.get('button').contains('Start sorting!').click() // Example action to open dialog
    cy.contains('h6', 'How many people?').should('exist') // Check if dialog is visible
  })

  it('should close dialog when clicking Cancel', () => {
    cy.get('button').contains('Start sorting!').click() // Open dialog
    cy.get('button').find('img[alt="cancel modal icon"]').click() // Click Cancel
    cy.contains('h6', 'How many people?').should('not.exist') // Check if dialog is closed
  })

  it('should have fade transition when opening and closing', () => {
    cy.get('button').contains('Start sorting!').click() // Open dialog
    cy.get('.fade-enter-active').should('exist') // Check for fade-in effect
    cy.get('button').find('img[alt="cancel modal icon"]').click() // Click Cancel
    cy.get('.fade-leave-active').should('exist') // Check for fade-out effect
  })
})
