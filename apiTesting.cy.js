describe('API tests with JSONPlaceholder', () => {
const baseUrl = 'https://jsonplaceholder.typicode.com';

it('returns a valid post', () => {
cy.request(`${baseUrl}/posts/1`).then((response) => {
expect(response.status).to.eq(200);
expect(response.body).to.have.property('id', 1);
expect(response.body).to.have.property('title');
});
});

it('POST creates a new resource', () => {
const newPost = {

title: 'My Cypress post', body: 'This is a test post created during API testing.', userId: 1,

};

cy.request('POST', `${baseUrl}/posts`, newPost).then((response) => {
expect(response.status).to.eq(201);
expect(response.body).to.include(newPost);

});
});
})