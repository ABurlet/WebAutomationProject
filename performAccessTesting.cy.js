// Performance + Accessibility testing with Lighthouse and axe-core

describe('Performance and Accessibility Testing', () => {
const dynamicUrl = 'https://the-internet.herokuapp.com/dynamic_content';
const mainUrl = 'https://the-internet.herokuapp.com';

// Challenge 1: Lighthouse Performance Audit

it('Challenge 1: runs Lighthouse and logs performance scores', () => {
cy.visit(mainUrl);

// acceptable scores 
cy.lighthouse({
performance: 0.5,
accessibility: 0.5,
'best-practices': 0.5,
seo: 0.5,
});
});



// Challenge 2: Accessibility Audit with axe-core

describe('Challenge 2: Accessibility with axe-core on dynamic content', () => {
beforeEach(() => {
cy.visit(dynamicUrl);
cy.injectAxe(); // inject axe into the page
});

it('checks accessibility on initial page load', () => {
cy.checkA11y(null, // context (null = whole page) 
null, 
(violations) => { // custom callback 
cy.wrap(violations).each((v) => {
cy.log(
`On load - ${v.id} (${v.impact}) on ${v.nodes.length} node(s)`
);
});
},
true // skipFailures: do not fail test if violations exist
);
});

it('checks accessibility after dynamic updates', () => {
// Trigger dynamic content on the Herokuapp "Dynamic Content" page
cy.contains('click here', { matchCase: false }).first().click();

// Make sure new content is visible so axe can scan the updated DOM
cy.get('#content').should('be.visible');
cy.injectAxe();
cy.checkA11y(
null,
null,
(violations) => {
cy.wrap(violations).each((v) => {
cy.log(
`After update - ${v.id} (${v.impact}) on ${v.nodes.length} node(s)`);
});
},
true
);
});
});


// Challenge 3: Combined performance and accessibility

it('Challenge 3: runs Lighthouse and axe on the same page', () => {
const combinedUrl = 'https://the-internet.herokuapp.com/login';

cy.visit(combinedUrl);

// Performancec with Lighthouse
cy.lighthouse({
performance: 0.5,
accessibility: 0.5,
'best-practices': 0.5,
seo: 0.5,
});

// Accessibility with axe-core
cy.injectAxe();
cy.checkA11y(null, null, null, {skipFailures: true});
});
});

