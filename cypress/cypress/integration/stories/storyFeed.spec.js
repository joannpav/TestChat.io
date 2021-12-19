/// <reference types="cypress" />

describe('story feed page', () => {    
    before(() => { 
        cy.login();            
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

        const EPIC = "asdf";

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
                    epicName: EPIC 
                }
            },
            failOnStatusCode: false
        }).then($resp => {
            cy.log($resp.body.data.getStories.length);
            const initialStoryCount = $resp.body.data.getStories.length            
            cy.get('[data-cy=body] > input').type("A user that is logged in should be able to manage a story");
            cy.get('[data-cy=acceptance] > input').type("User can add, delete, like and comment on a story");
            cy.get('[data-cy=submit]').click();

            cy.wait(500);
            cy.get('[data-cy=feedItem]')
                .its("length")
                .should("be.gt", initialStoryCount);     
        })
    })

    it.skip('can delete a story from the UI', () => {  
        // delete button not being found, need to investigate
        const uuid = () => Cypress._.random(0, 1e6).toString()
        
        const token = Cypress.env('token');
        const epicName = "this is the epic";
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
                    epicName: epicName,
                    body: body,
                    acceptanceCriteria: acceptance
                }
            },
            failOnStatusCode: false
        }).then($resp => {
            cy.log($resp.body.data.createStory.id);        
            expect($resp.body.data.createStory.id).to.not.be.null;      
            localStorage.setItem("jwtToken", token);      
            cy.visit("http://localhost:3000");
                        
            // cy.contains(body).parent().find('[data-cy=deleteButton]').then(($ele) => {
            //     $ele.click();
            //     cy.get('.primary').click();
            // })       
            cy.contains(body).then((bodyElement) => {
                bodyElement.parent().then((parentElement) => {
                    parentElement.find('[data-cy=deleteButton]').then((deleteButton) => {
                        deleteButton.click();
                    })
                })
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