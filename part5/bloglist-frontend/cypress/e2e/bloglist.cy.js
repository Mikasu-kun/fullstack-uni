describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user = {
      name: 'Gonzalo Coradello',
      username: 'gonzaloc',
      password: 'secret',
    }

    const otherUser = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, otherUser)
    cy.visit('')
  })

  it('login form is shown', function () {
    cy.contains('Log in')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('gonzaloc')
      cy.get('#password').type('secret')
      cy.get('button').click()

      cy.contains('Gonzalo Coradello logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('gonzaloc')
      cy.get('#password').type('wrong')
      cy.get('button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'gonzaloc', password: 'secret' })
    })

    it('a blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('input[name="Title"]').type('End to End testing with Cypress')
      cy.get('input[name="Author"]').type('Gonzalo Coradello')
      cy.get('input[name="Url"]').type('http://localhost:3001/api/blogs/13')
      cy.contains('create').click()

      cy.contains('End to End testing with Cypress - Gonzalo Coradello')
      cy.get('.success')
        .should(
          'contain',
          'New blog "End to End testing with Cypress" by Gonzalo Coradello created'
        )
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    describe('When there are blogs in the list', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'End to End testing with Cypress',
          author: 'Gonzalo Coradello',
          url: 'http://localhost:3001/api/blogs/13',
        })
        cy.createBlog({
          title: 'Differences between unit, integration and E2E testing',
          author: 'Gonzalo Coradello',
          url: 'http://localhost:3001/api/blogs/14',
        })
      })

      it('users can like a blog', function () {
        cy.contains('End to End testing with Cypress - Gonzalo Coradello')
          .contains('view')
          .click()
        cy.contains('like').click()
        cy.contains('likes: 1')
      })

      it('the user who created the blog can delete it', function () {
        cy.contains('End to End testing with Cypress - Gonzalo Coradello').as(
          'firstBlog'
        )
        cy.get('@firstBlog').contains('view').click()
        cy.contains('remove').click()
        cy.on('window:confirm', () => true)
        cy.get('@firstBlog').should('not.exist')
        cy.contains('Blog deleted')
      })

      it('blogs are ordered according to likes', function () {
        const firstBlogTitle = 'End to End testing with Cypress'
        const secondBlogTitle =
          'Differences between unit, integration and E2E testing'

        cy.get('.blog').eq(0).should('contain', firstBlogTitle)
        cy.get('.blog').eq(1).should('contain', secondBlogTitle)

        cy.contains(secondBlogTitle).contains('view').click()
        cy.contains(secondBlogTitle)
          .parent()
          .contains('like')
          .click()
          .wait(1000)
          .click()
          .wait(1000)

        cy.get('.blog')
          .eq(0)
          .should('contain', secondBlogTitle)
          .and('contain', 'likes: 2')
        cy.get('.blog')
          .eq(1)
          .should('contain', firstBlogTitle)
          .and('contain', 'likes: 0')
      })

      describe('When a different user is logged in', function () {
        beforeEach(function () {
          cy.login({ username: 'mluukkai', password: 'salainen' })
        })

        it('should not see the delete button', function () {
          cy.contains('view').click()
          cy.contains('remove').should('not.exist')
        })
      })
    })
  })
})
