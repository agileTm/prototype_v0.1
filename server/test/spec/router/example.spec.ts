import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const http = chai.request('http://localhost:3000/api/example');
const expect = chai.expect;

describe('example Test', () => {
    it('base', done => {
        http
            .get('/')
            .query({name: 'test'})
            .then(res => {
                expect(res.status).to.be.equal(200);
                expect(res.text).to.be.equal('test example');
                done();
            }).catch(e => done(e));
    });
});
