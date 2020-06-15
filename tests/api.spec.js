const app = require('../api');
const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('API', () => {
    it('GET /users', (done) => {
        chai.request(app).get('/users').end((err, res) => {
            expect(res).to.have.status(200);
            done();    
        });
    });

    it('GET /users/:id', (done) => {
        chai.request(app).get('/users/1').end((err, res) => {
            expect(res).to.have.status(200);
            done();    
        });
    });
    
    it('GET /todolists', (done) => {
        chai.request(app).get('/todolists').end((err, res) => {
            expect(res).to.have.status(200);
            done();    
        });
    });
    
    it('POST /users/:userId', (done) => {
        chai.request(app).post('/users/1').send({}).end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });
});
