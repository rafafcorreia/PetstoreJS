const supertest = require('supertest');

const petID = 123129;

describe('Petstore Swagger - Pet', () => {

    const request = supertest('https://petstore.swagger.io/v2');
    const massa = require('../../vendors/json/massaPet')
    
    it('POST Pet', () => {
        const pet = require('../../vendors/json/pet.json');
        return request
            .post('/pet')
            .send(pet)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.id).toBe(petID);
                expect(res.body.name).toBe("Athena");
            })
    })

    it('GET Pet', () => {
        return request
            .get('/pet/' + petID)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.id).toBe(petID);
            })
    })

    it('PUT Pet', () => {
        const petNovo = require('../../vendors/json/petNovo.json');
        return request
            .put('/pet')
            .send(petNovo)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.id).toBe(petID);
                expect(res.body.name).toBe("Hera");
            })
    })


    it('DELETE Pet', () => {
        return request
            .delete('/pet/' + petID)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    })

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
            const pet = require('../../vendors/json/pet.json');

            pet.id = idPet
            pet.name = nomePet
            pet.category.id = idCategoria
            pet.category.name = nomeCategoria

            return request
                .post('/pet')
                .send(pet) // send payload data
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.id).toBe(idPet);
                    expect(res.body.name).toBe(nomePet)
                    expect(res.body.category.id).toBe(idCategoria);
                    expect(res.body.category.name).toBe(nomeCategoria);
                });
        })

        it(`GET Pet - ${nomePet}`, () => {
            return request
                .get('/pet/' + idPet)
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.id).toBe(idPet);
                })
        })

        it(`DELETE Pet - ${nomePet}`, () => {
            return request
                .delete('/pet/' + idPet)
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                })
        })

    });

});