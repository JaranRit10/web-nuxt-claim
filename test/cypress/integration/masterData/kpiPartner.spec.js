/// <reference types="cypress" />

context('kpi partner Menu', () => {

  before(() => {
    cy.clearCookies()
    cy.login()
    // it('Change language', () => {
    //   cy.get('[class="lang"]')
    // })
  })

  describe('KPI Partner List', () => {
    it('Open page', () => {
      cy.openMenu('Master Data', 'KPI Partner')

      cy.get('.page__title')
        .should('have.text', 'KPI Partner List')
    })
    // it('Test search', () => {
    //   cy.get('#search-criteria').findByText('Survey Company ID').first().next().type('Coffee Flagship')
    //   cy.findByText('Search').click()
    // })
    // it('Auto search', () => {
    //   cy.get('.a-table table tbody tr')
    //     .should('have.length.gt', 1)
    // })
  })
  // Test Search
  describe('KPI Partner Search', () => {
    // let found = 0 // remember rows after serch by criteria

    it('Search by criteria', () => {
      // Member Id
      cy.get('#search-criteria').within(() => {
        cy.findByText('Member Id')
          .next()
          .type('10')
      })

      cy.findByText('Search')
        .click()
      cy.waitLoaderFinish()
      cy.get('button.btn-warning')
        .findByText('Clear')
        .click()
      cy.findByText('Search')
        .click()

      // Member Name
      cy.get('#search-criteria').within(() => {
        cy.findByText('Member Name')
          .next()
          .type('test')
      })
      cy.findByText('Search')
        .click()
      cy.waitLoaderFinish()
      cy.get('button.btn-warning')
        .findByText('Clear')
        .click()
      cy.findByText('Search')
        .click()

      // Branch Name
      cy.get('#search-criteria').within(() => {
        cy.findByText('Branch Name')
          .next()
          .type('v')
      })
      cy.findByText('Search')
        .click()
      cy.waitLoaderFinish()
      cy.get('button.btn-warning')
        .findByText('Clear')
        .click()
      cy.findByText('Search')
        .click()

      // Member Head Code
      cy.get('#search-criteria').within(() => {
        cy.findByText('Member Head Code')
          .next()
          .type('TestMember')
      })
      cy.findByText('Search')
        .click()
      cy.waitLoaderFinish()
      cy.get('button.btn-warning')
        .findByText('Clear')
        .click()
      cy.findByText('Search')
        .click()
      cy.waitLoaderFinish()

      // Member Head Name
      cy.get('#search-criteria').within(() => {
        cy.findByText('Member Head Name')
          .next()
          .type('test')
      })
      cy.findByText('Search')
        .click()
      cy.waitLoaderFinish()
      cy.get('button.btn-warning')
        .findByText('Clear')
        .click()
      cy.findByText('Search')
        .click()

      // Insurance Name
      cy.get('#search-criteria').within(() => {
        cy.findByText('Insurance Name')
          .next()
          .type('TestInsurance')
      })
      cy.findByText('Search')
        .click()
      cy.waitLoaderFinish()
      cy.get('button.btn-warning')
        .findByText('Clear')
        .click()
      cy.findByText('Search')
        .click()
      cy.waitLoaderFinish()

      // Partner Grade
      cy.get('#search-criteria').within(() => {
        cy.findByText('Partner Grade').first()
          .next()
          .select2('A')
      })
      cy.findByText('Search')
        .click()
      cy.waitLoaderFinish()
      cy.get('button.btn-warning')
        .findByText('Clear')
        .click()
      cy.findByText('Search')
        .click()
      cy.waitLoaderFinish()

      // Status
      cy.get('#search-criteria').within(() => {
        cy.findByText('Status').first()
          .next()
          .select2('A')
      })
      cy.findByText('Search')
        .click()
      cy.waitLoaderFinish()
      cy.get('button.btn-warning')
        .findByText('Clear')
        .click()
      cy.findByText('Search')
        .click()
      cy.waitLoaderFinish()

      cy.get('#search-criteria').within(() => {
        cy.findByText('Status').first()
          .next()
          .select2('I')
      })
      cy.findByText('Search')
        .click()
      cy.waitLoaderFinish()
      cy.get('button.btn-warning')
        .findByText('Clear')
        .click()
      cy.findByText('Search')
        .click()

    })


    // it('Search after clear', () => {
    //   cy.get('button.btn-warning')
    //     .findByText('Clear')
    //     .click()

    //   cy.findByText('Search')
    //     .click()

    //   cy.waitLoaderFinish()

    //   cy.get('.a-table table tbody tr')
    //     .should('have.length.gt', found) // search all must found rows more than serch by criteria
    // })
  })

  // Test Create
  describe('KPI Partner Create', () => {
    // it('Open page', () => {
    //   cy.findByText('Create')
    //     .click()

    //   cy.get('.page__title')
    //     .should('have.text', 'KPI Partner Create')

    //   cy.url()
    //     .should('include', '/master-data/kpi-partner/create')
    // })

    // it('Create Surveyor', () => {
    //   cy.findByText('Company Name')
    //     .next()
    //     .type('AutoTestCompany Name2')

    //   cy.findByText('Company Name (EN)')
    //     .next()
    //     .type('AutoTestCompanyNameEN2')

    //   cy.findByText('Insurance')
    //     .next()
    //     .type('AutoTestInsurance2')

    //   cy.findByText('Company Address')
    //     .next()
    //     .type('AutoTestCompanyAddress2')

    //   cy.findByText('Company Province')
    //     .next()
    //     .type('AutoTestCompanyProvince2')

    //   cy.findByText('Contact No')
    //     .next()
    //     .type('AutoTestContactNo2')

    //   cy.findByText('Save')
    //     .click()

    //   cy.findByText('OK')
    //     .click()
    // })
  })

  // View
  // describe('Surveyor Master Data View', () => {
  //   it('Open page', () => {
  //     cy.get('.a-table table tbody tr td:nth-child(9) > .btn-action-group')
  //     cy.get('.btn-action-group > .btn-info').eq(0).click()
  //   })
  //   it('View Surveyor', () => {
  //     cy.waitLoaderFinish()
  //     cy.findByText('Back')
  //       .click()
  //   })
  // })


  // Test Edit
  // describe('Surveyor Master Data Edit', () => {
  //   it('Open page', () => {
  //     cy.get('.a-table table tbody tr td:nth-child(9) > .btn-action-group')
  //     cy.get('.btn-action-group > .btn-warning').eq(0).click()
  //     cy.get('.page__title')
  //       .should('have.text', 'Surveyor Edit')

  //     cy.url()
  //       .should('include', '/master-data/surveyor/edit/')
  //   })
  //   it('Edit Surveyor', () => {
  //     cy.findByText('Company Name')
  //       .next().clear()
  //       .type('Test Edit Company Name')
  //     cy.findByText('Save')
  //       .click()

  //     cy.findByText('OK')
  //       .click()
  //   })
  // })


  // Delete
  // describe('Surveyor Master Data Delete', () => {
  //   it('Open page', () => {
  //     cy.get('.a-table table tbody tr td:nth-child(9) > .btn-action-group')
  //     cy.get('.btn-action-group > .btn-danger').eq(0).click()
  //   })
  //   it('Delete Surveyor', () => {
  //     cy.findByText('OK')
  //       .click()
  //   })
  // })

})