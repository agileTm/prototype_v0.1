import * as chai from 'chai';
import { signJWT } from '../../../src/module/jwt.module';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const http = chai.request('http://localhost:3000/api/infotrade');
const expect = chai.expect;

let jwt: any = null;
let jwt2: any = null;
let id: string = '';

let user1 = {id: 'testtest', type: 'A'};
let user2 = {id: 'test2', type: 'B'};
describe('info-trade', () => {
    before(async () => {
        jwt = signJWT(user1);
        jwt2 = signJWT(user2);
    });

    it('question', done => {
        http
            .post('/question')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                title: 'title',
                content: 'content'
            })
            .then(res => {
                expect(res.status).to.be.equal(200);
                id = res.text;
                done();
            }).catch(e => done(e));
    });

    it('question delete', done => {
        http
            .del('/question/' + id)
            .set('Authorization', `Bearer ${jwt}`)
            .then(res => {
                expect(res.status).to.be.equal(200);
                done();
            }).catch(e => done(e));
    });

    it('question get typeA', done => {
        http
            .get('/question')
            .set('Authorization', `Bearer ${jwt}`)
            .then(res => {
                expect(res.status).to.be.equal(200);
                const results: any[] = res.body;
                const userId = user1.id;
                for(const result of results) {
                    if(result.userId !== userId) {
                        throw new Error(`error not auth ${result.userId} !== ${userId}`);
                    }
                }
                done();
            }).catch(e => done(e));
    });

    it('question get typeB', done => {
        http
            .get('/question')
            .set('Authorization', `Bearer ${jwt}`)
            .then(res => {
                expect(res.status).to.be.equal(200);
                done();
            }).catch(e => done(e));
    });

    it('question params error', done => {
        http
            .post('/question')
            .set('Authorization', `Bearer ${jwt}`)
            .send({
                title: 'title'
            })
            .then(res => {
                expect(res.status).to.be.equal(412);
                expect(res.error.text).to.be.eq('data should have required property \'content\'');
                done();
            }).catch(e => done(e));
    });
});
