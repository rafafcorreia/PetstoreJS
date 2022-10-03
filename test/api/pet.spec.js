const assert = require('chai').assert;

const supertest = require('supertest');

const petID = 123129;

describe('Petstore Swagger', () => {

    const request = supertest('https://petstore.swagger.io/v2');

    it('POST Pet', () => {
        const pet = require('../../vendors/pet.json');
        return request
            .post('/pet')
            .send(pet) // send payload data
            .then((res) => {
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.id, petID);
                assert.equal(res.body.name, "Dog")
                assert.equal(res.body.photoUrls[0], "string");
                assert.equal(res.body.category.id, 0);
                assert.equal(res.body.tags[0].name, "string")
            });
    });

    it('GET Pet', () => {
        return request
            .get('/pet/' + petID)
            .then((res) => {
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.id, petID);
            })
    })

    it('PUT Pet', () => {
        const petNovo = require('../../vendors/petNovo.json');
        return request
            .put('/pet')
            .send(petNovo)
            .then((res) => {
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.id, petID);
                assert.equal(res.body.name, "Athena");
            })
    })

    it('DELETE Pet', () => {
        return request
            .delete('/pet/' + petID)
            .then((res) => {
                assert.equal(res.statusCode, 200);
            })
    })
});