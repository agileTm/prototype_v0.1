import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const http = chai.request('http://localhost:3000/api/signin');
const expect = chai.expect;
const params = {
    id: 'testtest',
    password: '123'
};

let jwt = '';
describe('sign in', () => {
    it('sign-in params error', done => {
        http
            .post('/')
            .send({
                id: params.id
            })
            .then(res => {
                expect(res.status).to.be.equal(412);
                expect(res.error.text).to.be.eq('data should have required property \'password\'');
                done();
            }).catch(e => done(e));
    });

    it('sign-in', done => {
        http
            .post('/')
            .send(params)
            .then(res => {
                expect(res.status).to.be.equal(200);
                expect(res.body.id).to.be.eq(params.id);
                jwt = res.body.token;
                done();
            }).catch(e => done(e));
    });

    it('sign-in wrong id/password', done => {
        http
            .post('/')
            .send({
                id: params.id,
                password: 'test123'
            })
            .then(res => {
                expect(res.status).to.be.equal(401);
                expect(res.error.text).to.be.eq('wrong id/password');
                done();
            }).catch(e => done(e));
    });

    it('sign-in check', done => {
        http
            .post('/check')
            .set('Authorization', `Bearer ${jwt}`)
            .then(res => {
                expect(res.status).to.be.equal(200);
                expect(res.body.id).to.be.eq('testtest');
                done();
            }).catch(e => done(e));
    });
});
