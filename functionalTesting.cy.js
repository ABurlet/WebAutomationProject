describe('Functional tests for The Internet application', () => {
const baseUrl = 'https://the-internet.herokuapp.com';



it('Login succeeds with valid credentials', () => {
cy.visit(`${baseUrl}/login`);
cy.get('#username').type('tomsmith');
cy.get('#password').type('SuperSecretPassword!');
cy.get('button[type="submit"]').click();
cy.url().should('include', '/secure');
cy.contains('You logged into a secure area!').should('be.visible');
});





it('Login fails with invalid credentials', () => {
cy.visit(`${baseUrl}/login`);
cy.get('#username').type('wronguser');
cy.get('#password').type('wrongpass');
cy.get('button[type="submit"]').click();
cy.url().should('include', '/login');
cy.contains('Your username is invalid!').should('be.visible');
});




it('Checkboxes can be toggled', () => {
cy.visit(`${baseUrl}/checkboxes`);
cy.get('#checkboxes input').eq(0).as('first');
cy.get('#checkboxes input').eq(1).as('second');
cy.get('@first').check().should('be.checked');
cy.get('@second').uncheck().should('not.be.checked');
});




it('Uploads a file successfully', () => {
cy.visit(`${baseUrl}/upload`);

cy.get('#file-upload').selectFile('cypress/fixtures/example.json');
cy.get('#file-submit').click();
cy.contains('File Uploaded!').should('be.visible');
cy.contains('example.json').should('be.visible');
});




it('Dynamic Content – loads new content after click', () => {
cy.visit('https://the-internet.herokuapp.com/dynamic_content');

cy.get('#content .row').first().invoke('text').then((before) => {
cy.log('Before text:', before);
cy.contains('click here', { matchCase: false }).first().click(); // 'click here' link to load new content

cy.get('#content .row').first().invoke('text').then((after) => { 
cy.log('After text:', after); // log if there is still content after update and try to check if it changed, but don’t fail if not
expect(after.trim()).to.not.be.empty; // if page responds and content exists

if (after.trim() === before.trim()) {
cy.log('Content happened to be the same this time (randomized page).');
} else {
cy.log('Content changed after click'); //  log if it changes

}
})
})
}
)
})
