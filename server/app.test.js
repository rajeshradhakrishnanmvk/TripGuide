// JavaScript (Node.js)
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');
const fs = require('fs');

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /upload', () => {
    it('should return 200 status code when uploading a file', (done) => {
        chai.request(app)
            .post('/upload')
            .attach('file', './test/testfile.csv')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').equal('File uploaded successfully');
                done();
            });
    });


});