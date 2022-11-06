/// <reference types="cypress" />
describe('Test CrearSesion', function() {
  it('what_it_does', function() {
     cy.viewport(2560, 1292)
     cy.visit('http://localhost:4200/crear-sesion')
     cy.get('[data-test-id=ejercicios]').click()
     cy.get('[data-test-id=ejercicios]').type('Enrollar toalla')
     cy.get('.card > .card-body > .mt-3 > .mb-2:nth-child(2) > .form-control').click()
     cy.get('.card > .card-body > .mt-3 > .mb-2:nth-child(2) > .form-control').type('10')
     cy.get('.card > .card-body > .mt-3 > .mb-2:nth-child(3) > .form-control').click()
     cy.get('.card > .card-body > .mt-3 > .mb-2:nth-child(3) > .form-control').type('18')
     cy.get('.card > .card-body > .mt-3 > .mb-2:nth-child(4) > .form-control').click()
     cy.get('.card > .card-body > .mt-3 > .mb-2:nth-child(4) > .form-control').type('2022-11-03')
     cy.get('.card > .card-body > .mt-3 > .mb-2 > #inputNotas').click()
     cy.get('.card > .card-body > .mt-3 > .mb-2 > #inputNotas').type('Dolor al girar a la derecha')
     cy.get('.card > .card-body > .mt-3 > .mb-2 > #btnAgregarNota').click()
     cy.get('.card > .card-body > .mt-3 > .mb-2 > .btn-success').click()
  })
 })
 
 