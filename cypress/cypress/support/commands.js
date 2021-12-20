// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('clickLink', (label) => {
    cy.get('a').contains(label).click()
  })

Cypress.Commands.add('setTokenLoadHome', () => {
    const token = Cypress.env('token');
    localStorage.setItem("jwtToken", token);      
    cy.visit("/");
})

Cypress.Commands.add('login', () => {
    const loginMutation = `
        mutation login ($username: String!, $password: String!) {
            login (username: $username, password: $password) {
                id
                token
                username
            }
        }`;
        cy.request({
            url: 'http://localhost:5000',
            method: 'POST',
            body: {
                query: loginMutation,
                variables: {
                    username: 'joannpav',
                    password: 'joannpav'
                }                
            }
        }).then(($response) => {
            cy.log($response.body.data.login.token);
            Cypress.env('token', $response.body.data.login.token);             
        }) 
})
