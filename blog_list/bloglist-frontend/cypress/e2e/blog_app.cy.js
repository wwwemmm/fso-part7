/* eslint-disable cypress/no-unnecessary-waiting */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  it('Login form can be opened', function() {
    cy.contains('login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })
    it('login fails with wrong password', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('[id="new blog"]').click()
      cy.get('[placeholder="write blog title here"]').type('cypress title 1')
      cy.get('[placeholder="write blog author here"]').type('cypress author 1')
      cy.get('[placeholder="write blog url here"]').type('cypress url 1')
      cy.contains('create').click()
      cy.contains('a new blog cypress title 1 by cypress author 1')
      cy.get('.blog:last').contains('cypress title 1')

      cy.get('[id="new blog"]').click()
      cy.get('[placeholder="write blog title here"]').type('cypress title 2')
      cy.get('[placeholder="write blog author here"]').type('cypress author 2')
      cy.get('[placeholder="write blog url here"]').type('cypress url 2')
      cy.contains('create').click()
      cy.contains('a new blog cypress title 2 by cypress author 2')
      cy.get('.blog:last').contains('cypress title 2')
    })

    describe('When two blogs have been create', function() {
      beforeEach(function() {
        cy.get('[id="new blog"]').click()
        cy.get('[placeholder="write blog title here"]').type('title 1')
        cy.get('[placeholder="write blog author here"]').type('author 1')
        cy.get('[placeholder="write blog url here"]').type('url 1')
        cy.contains('create').click()
        cy.contains('a new blog title 1 by author 1')
        cy.get('.blog:last').contains('title 1')

        cy.get('[id="new blog"]').click()
        cy.get('[placeholder="write blog title here"]').type('title 2')
        cy.get('[placeholder="write blog author here"]').type('author 2')
        cy.get('[placeholder="write blog url here"]').type('url 2')
        cy.contains('create').click()
        cy.contains('a new blog title 2 by author 2')
        cy.get('.blog:last').contains('title 2')
      })
      it('A blog can be liked', function() {
        cy.get('.view-button').eq(0).click()
        cy.contains('likes 0')
        cy.get('.like').click()
        cy.contains('likes 1')
      })
    })
  })

  describe('Delete', function(){
    beforeEach(function() {
      const user = {
        name: 'Super User',
        username: 'root',
        password: 'secret'
      }
      cy.request('POST', 'http://localhost:3000/api/users/', user)

      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.get('[id="new blog"]').click()
      cy.get('[placeholder="write blog title here"]').type('title mluukkai')
      cy.get('[placeholder="write blog author here"]').type('author mluukkai')
      cy.get('[placeholder="write blog url here"]').type('url mluukkai')
      cy.contains('create').click()
      cy.contains('a new blog title mluukkai by author mluukkai')
      cy.get('.blog:last').contains('title mluukkai')

      cy.contains('logout').click()
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.get('[id="new blog"]').click()
      cy.get('[placeholder="write blog title here"]').type('title root')
      cy.get('[placeholder="write blog author here"]').type('author root')
      cy.get('[placeholder="write blog url here"]').type('url root')
      cy.contains('create').click()
      cy.contains('a new blog title root by author root')
      cy.get('.blog:last').contains('title root')
    })

    it('the user who created a blog can delete it', function(){
      cy.get('.view-button').eq(1).click()
      cy.get('.blog').eq(1)
        .contains('Super User')
        .get('.remove')
        .should('exist')
        .should('be.visible')
        .click()
      cy.get('.blog').should('have.length', 1)
      cy.contains('titile root').should('not.exist')
    })

    it('only the creator can see the delete button of a blog, not anyone else', function(){
      cy.get('.view-button').eq(1).click()
      cy.get('.remove')
        .should('be.visible')
        //.should('exist')
        //.should('not.have.attr', 'style', 'display: none;')
      cy.contains('hide').click()

      cy.get('.view-button').eq(0).click()
      cy.get('.remove')
        .should('not.be.visible')
        //.should('exist')
        //.should('have.attr', 'style', 'display: none;')
    })
  })

  describe('Blogs order', function(){
    beforeEach(function() {
      const user = {
        name: 'Super User',
        username: 'root',
        password: 'secret'
      }
      cy.request('POST', 'http://localhost:3000/api/users/', user)

      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.get('[id="new blog"]').click()
      cy.get('[placeholder="write blog title here"]').type('title mluukkai')
      cy.get('[placeholder="write blog author here"]').type('author mluukkai')
      cy.get('[placeholder="write blog url here"]').type('url mluukkai')
      cy.contains('create').click()
      cy.contains('a new blog title mluukkai by author mluukkai')
      cy.get('.blog:last').contains('title mluukkai')

      cy.contains('logout').click()
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.get('[id="new blog"]').click()
      cy.get('[placeholder="write blog title here"]').type('title root')
      cy.get('[placeholder="write blog author here"]').type('author root')
      cy.get('[placeholder="write blog url here"]').type('url root')
      cy.contains('create').click()
      cy.contains('a new blog title root by author root')
      cy.get('.blog:last').contains('title root')
    })

    it('blogs are ordered according to likes', function(){
      cy.get('.view-button').eq(1).click()
      cy.get('.like').click()
      cy.wait(2000)
      cy.get('.like').click()
      cy.contains('hide').click()

      cy.get('.blog').eq(0).contains('title root')

      cy.get('.view-button').eq(1).click()
      cy.get('.like').click()
      cy.wait(2000)
      cy.contains('hide').click()

      cy.get('.blog').eq(0).contains('title root')
    })
  })
})
