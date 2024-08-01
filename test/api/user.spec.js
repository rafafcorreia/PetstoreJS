const supertest = require('supertest');

let token;
let username;
let usernameNovo;

describe('Petstore Swagger - User', () => {

    const request = supertest('https://petstore.swagger.io/v2');

    it('POST User', () => {
        const user = require('../../vendors/json/user.json');
        username = user.username;

        return request
            .post('/user')
            .send(user)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.code).toBe(200);
                expect(res.body.type).toBe("unknown");
                token = res.body.message;
                console.log(token);
            })
    })

    it('GET User', () => {
        return request
            .get(`/user/${username}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.id).toBe(789123);
                expect(res.body.username).toBe(username);
                expect(res.body.firstName).toBe("Fulano");
                expect(res.body.lastName).toBe("Ciclano");
            })
    })

    it('PUT User', () => {
        const user = require('../../vendors/json/userNovo.json');
        usernameNovo = user.username;

        return request
            .put(`/user/${username}`)
            .send(user)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.code).toBe(200);
                expect(res.body.type).toBe("unknown");
                expect(res.body.message).toBe("789123");
            })
    })

    it('GET User Login', () => {
        
        return request
            .get('/user/login?username=dsadusahdasdaso&password=12345')
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.code).toBe(200);
                expect(res.body.type).toBe("unknown");

                // token = res.body.message.substring(23);
                token = res.body.message.split(':')[1];
                console.log(res.body);
                console.log(`Token extraido: ${token}`);
            })
    })

    it('DELETE User', () => {

        return request
            .delete(`/user/${usernameNovo}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.code).toBe(200);
                expect(res.body.type).toBe("unknown");
                expect(res.body.message).toBe(usernameNovo);
            })
    })
});