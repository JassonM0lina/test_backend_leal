const md5 = require('md5');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const transactionCreate = require('../src/transaction_create/server');
const transactionHistory = require('../src/transaction_history/server');
const transactionInactive = require('../src/transaction_inactive/server');
const transactionTotalpoints = require('../src/transaction_totalpoints/server');
const userLogin = require('../src/user_login/server');
const userRegister = require('../src/user_register/server');
chai.use(chaiHttp);


let sampleToken = '';
  describe('/POST Register a new user into abc app', () => {
    it('it should try to register a new user', (done) => {
      const user = {
        user_id: md5('js.molina@uniandes.edu.co'),
        created_date: new Date(),
        name: 'Jasson',
        lastname: 'Molina',
        birth_date: new Date(),
        email: 'js.molina@uniandes.edu.co',
        password: 'con3349817ray'
      }
      chai.request(userRegister)
      .post('/signup')
      .send(user)
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
      done();
      });
    }).timeout(10000);
  });

  describe('/POST Login an existing user into abc app', () => {
      it('it should try to login an existing user successfully', (done) => {
          const user = {
            email: 'js.molina@uniandes.edu.co',
            password: 'con3349817ray'
          }
          chai.request(userLogin)
          .post('/signin')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('token');
            sampleToken = res.body.token;
            done();
          });
      }).timeout(10000);
  });

  describe('/GET sum the total points of the active user transactions', () => {
      it('it should GET the total sum of points from all active user transactions', (done) => {
            chai.request(transactionTotalpoints)
            .get('/transaction/totalpoints')
            .set('Jasson ', 'Molina '+ sampleToken)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              done();
            });
      }).timeout(10000);
  });

  describe('/PUT/:transaction_id inactive a specific user transaction', () => {
      it('it should try to UPDATE a transaction by changing its status to 0 but receive a 400 (wrong) status', (done) => {
          chai.request(transactionInactive)
          .put('/transaction/inactive/' + 1)
          .set('Jasson ', 'Molina '+ sampleToken)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      }).timeout(10000);
  });

  describe('/GET the user transaction history in order Desc', () => {
    it('it should GET all transactions from a user in order Desc', (done) => {
          chai.request(transactionHistory)
          .get('/transaction/history')
          .set('Jasson ', 'Molina '+ sampleToken)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            done();
          });
    }).timeout(10000);
});

  describe('/POST Create a new user transaction', () => {
    it('it should create a new Transaction successfully', (done) => {
        const transaction = {
          value: 777,
          points: 33,
        }
        chai.request(transactionCreate)
        .post('/transaction/create')
        .set('Jasson ', 'Molina '+ sampleToken)
        .send(transaction)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('value');
          res.body.should.have.property('points');
          done();
        });
    }).timeout(10000);
});
