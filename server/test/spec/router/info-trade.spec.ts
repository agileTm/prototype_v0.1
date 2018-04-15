import * as chai from 'chai';
import { signJWT } from '../../../src/module/jwt.module';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const http = chai.request('http://localhost:3000/api/infotrade');
const expect = chai.expect;

let jwt: any = null;
let id: string = '';
describe('info-trade', () => {
    before(async () => {
        jwt = signJWT({id: 'testtest', type: 'A'});
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
