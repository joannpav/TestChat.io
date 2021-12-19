/// <reference types="cypress" />
import { hasOperationName, aliasQuery, aliasMutation } from '../../utilities/graphql-test-utils';


describe('story feed page', () => {    
    before(() => { 
        cy.login();            
    })    

    beforeEach(() => {
        cy.intercept('POST', 'http://localhost:5000/graphql', (req) => {                        
            aliasQuery(req, 'getStories')                    
            aliasMutation(req, 'createStory')            
        })
    })

    it('can login through UI', () => {
        cy.visit("http://localhost:3000");
        cy.contains('Username').type("joannpav");
        cy.contains("Password").type("joannpav");
        cy.get('#loginButton').click();
        cy.get('[data-cy=loggedInUsername]').should('exist');
    })
    
    it.skip('fetches all stories', () => {
        // todo: this endpoint doesn't require security right now, but it should        
        cy.request({
            url: 'http://localhost:5000/',
            method: 'POST',
            body: { 
                operationName: 'getStories',
                query: `
                query getStories {
                    getStories {
                        id
                    }
                }`,
             },
        })
    })

    it('can create a story from the UI', () => {    
        cy.setTokenLoadHome();
        cy.visit("/asdf/stories")

        const epic = "asdf";

        cy.request({
            url: 'http://localhost:5000/',
            method: 'POST',
            body: { 
                operationName: 'getStories',
                query: `
                    query getStories($epicName: String!) {
                        getStories (epicName: $epicName) {
                            id
                        }
                    }`,
                variables: {
                    epicName: epic 
                }
            },
            failOnStatusCode: false
        }).then($resp => {
            cy.log($resp.body.data.getStories.length);
            const initialStoryCount = $resp.body.data.getStories.length            
            cy.get('[data-cy=body] > input').type("A user that is logged in should be able to manage a story");
            cy.get('[data-cy=acceptance] > input').type("User can add, delete, like and comment on a story");
            cy.get('[data-cy=submit]').click();
            
            // if (hasOperationName($resp, 'getStories')) {            
            //     cy.wait('@gqlgetStoriesMutation')
            //     // cy.wait(500);
                   
            // }
            // Workaround bc can't get intercept to work just yet
            cy.wait(500);
            cy.reload();
            cy.get('[data-cy=feedItem]')
                    .its("length")
                    .should("be.gt", initialStoryCount);  
        })
    })

    it('can delete a story from the UI', () => {  
        // delete button not being found, need to investigate
        const uuid = () => Cypress._.random(0, 1e6).toString()     
        const token = Cypress.env('token');   
        const epic = "asdf";                
        const body = uuid();
        const acceptance = "this is the acceptance";
        const mutation = `
            mutation createStory ($epicName: String, $body: String!, $acceptanceCriteria: String) {
                createStory (epicName: $epicName, body: $body, acceptanceCriteria: $acceptanceCriteria) {
                    id
                }
            }`;
                        

        cy.request({
            url: 'http://localhost:5000/',
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}` 
            },
            body: { 
                query: mutation,
                variables: {
                    epicName: epic,
                    body: body,
                    acceptanceCriteria: acceptance
                }
            },
            failOnStatusCode: false
        }).then($resp => {
            cy.log($resp.body.data.createStory.id);        
            expect($resp.body.data.createStory.id).to.not.be.null;      
            cy.setTokenLoadHome();
            cy.visit(`/${epic}/stories`);
            
            cy.contains(body).parent().parent().parent().find('[data-cy=deleteButton]').then(($ele) => {
                $ele.click();
                cy.get('.primary').click();
            })                  
            cy.contains(body).should('not.exist');
        })
    })
    
    it('clicking story name opens single story page', () => {        
        assert.fail("Not implemented") 
    })
    it('clicking like increases like count and updates color', () => {
        assert.fail("Not implemented") 
    })
    it('adding scenarios updates scenario count and changes color', () => {
        assert.fail("Not implemented") 
    })

})