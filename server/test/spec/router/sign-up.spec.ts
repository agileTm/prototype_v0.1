import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { RethinkDB } from '../../../src/module/rethinkdb.module';
import { Config } from '../../../src/config/config';

chai.use(chaiHttp);

const http = chai.request('http://localhost:3000/api/signup');
const expect = chai.expect;
const params = {
    id: 'test',
    password: 'test',
    type: 'A'
};

let r: any = null;
describe('sign up Test', () => {
    before(async () => {
        const rethinkdb = new RethinkDB(Config.DB, Config.HOST, Config.DB_TABLE);
        await rethinkdb.connect();
        r = rethinkdb.r;
    });

    it('sign-up params error', done => {
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

    it('sign-up params type', done => {
        http
            .post('/')
            .send({
                id: params.id,
                password: params.password,
                type: 'C'
            })
            .then(res => {
                expect(res.status).to.be.equal(412);
                expect(res.error.text).to.be.eq('data.type should be equal to one of the allowed values');
                done();
            }).catch(e => done(e));
    });

    it('sign-up', done => {
        http
            .post('/')
            .send(params)
            .then(res => {
                expect(res.status).to.be.equal(200);
                done();
            }).catch(e => done(e));
    });

    it('sign-up Duplicate ID', done => {
        http
            .post('/')
            .send(params)
            .then(res => {
                expect(res.status).to.be.equal(412);
                expect(res.error.text).to.be.eq('Duplicate ID');
                done();
            }).catch(e => done(e));
    });

    after(async () => {
        await r.table(Config.TABLE_MEMBER).get(params.id).delete();
        r.getPoolMaster().drain();
    })
});
