import BaseInput from './BaseInput.vue'

describe('<BaseInput />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(BaseInput)
  })
})