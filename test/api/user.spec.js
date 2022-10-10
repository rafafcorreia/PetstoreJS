const assert = require('chai').assert;

const supertest = require('supertest');

let token;
let username;
let usernameNovo;

describe('Petstore Swagger - User', () => {

    const request = supertest('https://petstore.swagger.io/v2');

    it('POST User', () => {
        const user = require('../../vendors/user.json');
        username = user.username;

        return request
            .post('/user')
            .send(user)
            .then((res) => {
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.code, 200);
                assert.equal(res.body.type, "unknown");
                token = res.body.message;
                console.log(token);
            })
    })

    it('GET User', () => {
        return request
            .get(`/user/${username}`)
            .then((res) => {
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.id, 789123);
                assert.equal(res.body.username, username);
                assert.equal(res.body.firstName, "Fulano");
                assert.equal(res.body.lastName, "Ciclano");
            })
    })

    it('PUT User', () => {
        const user = require('../../vendors/userNovo.json');
        usernameNovo = user.username;

        return request
            .put(`/user/${username}`)
            .send(user)
            .then((res) => {
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.code, 200);
                assert.equal(res.body.type, "unknown");
                assert.equal(res.body.message, 789123);
            })
    })

    it('DELETE User', () => {

        return request
            .delete(`/user/${usernameNovo}`)
            .then((res) => {
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.code, 200);
                assert.equal(res.body.type, "unknown");
                assert.equal(res.body.message, usernameNovo);
            })
    })
});