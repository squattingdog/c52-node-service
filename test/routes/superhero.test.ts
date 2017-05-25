import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as AppConfig from '../../src/config/AppConfig';
import ConfigUtil from '../../src/config/ConfigUtil';
import { App } from '../../src/App';

// create the express app
let expressApp: App = new App(ConfigUtil.getSettings('dev'));
let express = expressApp.getExpress();

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/heroes', () => {
    it('responds with JSON array', () => {
        return chai.request(express).get('/api/v1/heroes')
            .then(res => {
                expect(res.status).to.eql(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.length(5);
            });
    });

    it('should include wolverine', () => {
        return chai.request(express).get('/api/v1/heroes')
            .then(res => {
                let wolverine = res.body.find(hero => hero.name === 'Wolverine');
                expect(wolverine).to.exist;
                expect(wolverine).to.have.all.keys([
                    'id'
                    , 'name'
                    , 'aliases'
                    , 'occupation'
                    , 'gender'
                    , 'height'
                    , 'hair'
                    , 'eyes'
                    ,'powers'
                ]);
            });
    });

    describe('GET api/v1/heroes/:id', () => {
        it('responds with single JSON object', () => {
            return chai.request(express).get('/api/v1/heroes/1')
                .then(res => {
                    expect(res.status).to.equal(200);
                    expect(res).to.be.json;
                    expect(res.body).to.be.an('object');
                });
        });

        it('should return Luke Cage', () => {
            return chai.request(express).get('/api/v1/heroes/1')
                .then(res => {
                    expect(res.body.hero.name).to.equal('Luke Cage');
                });
        });
    });

});



