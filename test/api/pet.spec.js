const assert = require('chai').assert;

const supertest = require('supertest');

const petID = 123129;

describe('Petstore Swagger - Pet', () => {

    const request = supertest('https://petstore.swagger.io/v2');
    const massa = require('../../vendors/json/massaPet')
    const pet = require('../../vendors/json/pet.json');

    /*it.only.each(massa.array.map(elemento => [
        elemento.nomePet,
        elemento.idPet,
        elemento.nomeCategoria,
        elemento.idCategoria]))
        ('POST Pet %s', (nomePet, idPet, nomeCategoria, idCategoria) => {

            pet.id = idPet
            pet.name = nomePet
            pet.category.id = idCategoria
            pet.category.name = nomeCategoria */
    massa.array.forEach(({ nomePet, idPet, nomeCategoria, idCategoria }) => {

        it(`POST Pet - ${nomePet}`, () => {

            pet.id = idPet
            pet.name = nomePet
            pet.category.id = idCategoria
            pet.category.name = nomeCategoria

            return request
                .post('/pet')
                .send(pet) // send payload data
                .then((res) => {
                    assert.equal(res.statusCode, 200);
                    assert.equal(res.body.id, idPet);
                    assert.equal(res.body.name, nomePet)
                    assert.equal(res.body.category.id, idCategoria);
                    assert.equal(res.body.category.name, nomeCategoria)
                });
        })

        it(`GET Pet - ${nomePet}`, () => {
            return request
                .get('/pet/' + idPet)
                .then((res) => {
                    assert.equal(res.statusCode, 200);
                    assert.equal(res.body.id, idPet);
                })
        })

        it(`DELETE Pet - ${nomePet}`, () => {
            return request
                .delete('/pet/' + idPet)
                .then((res) => {
                    assert.equal(res.statusCode, 200);
                })
        })

    });



    it.skip('PUT Pet', () => {
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

});