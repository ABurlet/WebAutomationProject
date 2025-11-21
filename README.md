# WebAutomationProject

In this README I will:
- Explain what was tested
- Show why those tests matter
- Document the setup and execution steps taken
- Summarize problems and debugging strategies used
- State results of the tests



**CYPRESS WEB AUTOMATION PROJECT**
This project demonstrates end-to-end, functional, performance, and accessibility testing using Cypress. 
The tested application for this project is The Internet Herokuapp, which is a publicly available demo application commonly used for QA automation practice.


The project includes:
- Functional UI automation
- API request validation
- Performance audits using Lighthouse
- Accessibility audits using axe-core
- Debugging and assertion refinement


Tools used and their purposes:
- Cypress: End-to-end and UI automation 
- cypress-axe: Accessibility audits 
- cypress-audit and Lighthouse: Performance audits 
- Node.js: Dependency management


Structure: 
cypress/e2e/performAccessTesting.cy.js   
Lighthouse and axe-core audits

functionalTesting.cy.js  
Dynamic content functional tests

apiTesting.cy.js
API request and response assertions

support/commands.js  
Custom Cypress commands

cypress.config.js
Plugin setup and Lighthouse integration
package.json



**TEST COVERAGE**

**FUNCTIONAL TESTING**
(functionalTesting.cy.js)

- Validates that clicking dynamic content loads new text
- Stores content before and after update using `.as()`
- Uses `.then()` to compare state without errors
- Makes sure that the page updates instead of a static refresh

ASSERTIONS USED:
- `should('be.visible')`
- Text comparison with `expect(before).not.to.eq(after)`



**API TESTING**
(apiTesting.cy.js)

THIS TEST USES: 
- cy.request()
- Validation of status code
- Assertions for response body
- Checks JSON types and fields like, expect(response.status).to.eq(200); and expect(response.body).to.have.property(“userId”);



**PERFORMANCE AND ACCESSIBILITY TESTING**
(performAccessTesting.cy.js)

-Runs Lighthouse audits for performance, SEO, best-practices, and accessibility
-Uses cy.lighthouse() with score thresholds

Accessibility
- Injects axe-core
- Logs violations instead of failing the test
- Runs audits again after DOM updates


My approach:
- Used true for skipFailures to view violations without failing the test 
- logged display violation ID, impact, and count



FOR SET UP AND INSTALLATION
- npm install
- npm install cypress --save-dev
- npm install cypress-axe --save-dev
- npm install cypress-audit --save-dev

- To run Cypress UI, use npx cypress open.
- To run tests, use npx cypress run or, once cypress is opened, click on individual test specs in cypress to run them.





**ISSUES FACED DURING THIS PROJECT** 

- Cy.lighthouse is not a function because plugin was not registered in config folder. So I added setupNodeEvents and lighthouse task.
- There was a cypress error for a command inside .should(). Retried test, but it cannot contain commands. So, I switched to .then().
- Accessibility tests were failing due to certain violations and axe uses a strict 0 violations rule.
- I used skipFailures and manual logging to solve the issue.
- The dynamic content captured the same text because the assertion happened before the DOM updated. So, I forced visibility and waited for a new result. 



**RESULTS**

- Functional Tests: Passed
- API Tests: Passed
- Performance Tests: Logged scores 
- Accessibility: Violations logged + documented
- Stability: Commands chained properly, no retry recursion




**CONCLUSION**

This project demonstrates real world QA automation skills, the ability to debug asynchronous behaviors in Cypress, validate performance and accessibility more so than basic UI tests, custom commands and modular configurations. It lays a good foundation for full automated pipelines, cross browser execution, and advanced selector strategies as described in project guidelines. 



Created by Amber Burlet
QA | Web Automation



