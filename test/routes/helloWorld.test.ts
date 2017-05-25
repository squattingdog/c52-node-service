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

describe('baseRoute', () => {
    it('should be json', () => {
        return chai.request(express).get('/')
            .then(res => {
                expect(res.type).to.eql('application/json');
            });
    });

    it('should have a message prop', () => {
        return chai.request(express).get('/')
            .then(res => {
                expect(res.body.message).to.eql('I am online!!');

            });
    });
});