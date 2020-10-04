const app = require('../classes/api');
const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('API', () => {
    describe('GET /users', () => {
        it('should return an array of user', (done) => {
            chai.request(app).get('/users').end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(3);
                done();    
            });
        });
    });

    describe('GET /users/:id', () => {
        it('should return one user', (done) => {
            chai.request(app).get('/users/1').end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(1);
                done();    
            });
        });
    });

    describe('GET /todolists', () => {
        it('should return an array of todolist', (done) => {
            chai.request(app).get('/todolists').end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(1);
                done();    
            });
        });
    });

    describe('GET /todolists/:todolistId', () => {
        it('should return one todolist', (done) => {
            const todolistId = 1;
            chai.request(app).post(`/todolists/${todolistId}`).send({}).end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.be.a('string');
                expect(res.body.message).to.equal(`Item added to Todolist ${todolistId}`);
                done();
            });
        });
    });
});
