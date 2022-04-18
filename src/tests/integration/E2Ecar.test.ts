import Sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import CarModel from '../../models/CarModel';
import carMock from '../mocks/carMock';
import { Car } from '../../interfaces/CarInterface';

chai.use(chaiHttp);

const app = server.getApp();

describe('/cars routes', () => {
  const carModel = new CarModel();

  describe('route POST /cars', () => {
    describe('when the car is created with success', () => {
      before(() => Sinon.stub(carModel.model, 'create').resolves(carMock.car));
      after(() => Sinon.restore());
  
      it('must return a status 201 and the created car', async () => {
        const response = await chai.request(app).post('/cars').send(carMock.params);
        expect(response.status).to.be.eq(201);
        expect(response.body).to.be.deep.eq(carMock.car);
      });
    });

    describe('when one of the params is invalid or it is missing', () => {
      before(() => Sinon.stub(carModel.model, 'create').resolves(carMock.car));
      after(() => Sinon.restore());
  
      it('must return a status 400 and an invalid error message', async () => {
        const response = await chai.request(app).post('/cars').send(carMock.invalid);
        expect(response.status).to.be.eq(400);
        expect(response.body).haveOwnProperty('error');
      });
    });

    describe('when the car cannot be created - internal error', () => {
      before(() => Sinon.stub(carModel.model, 'create').resolves());
      after(() => Sinon.restore());
  
      it('must return a status 500 and an internal error message', async () => {
        const response = await chai.request(app).post('/cars').send(carMock.car);
        expect(response.status).to.be.eq(500);
        expect(response.body).haveOwnProperty('error');
      });
    });
  });

  describe('route GET /cars', () => {
    describe('when the car list is returned with success', () => {
      before(() => Sinon.stub(carModel.model, 'find').resolves(carMock.list as any));
      after(() => Sinon.restore());
  
      it('must return a status 200 and all the cars', async () => {
        const response = await chai.request(app).get('/cars');
        expect(response.status).to.be.eq(200);
        expect(response.body).to.be.deep.eq(carMock.list);
      });
    });

    describe('when the anything is found', () => {
      before(() => Sinon.stub(carModel.model, 'find').resolves());
      after(() => Sinon.restore());
  
      it('must return a status 404 and an not found error message', async () => {
        const response = await chai.request(app).get('/cars');
        expect(response.status).to.be.eq(404);
        expect(response.body).haveOwnProperty('error');
      });
    });
  });

  describe('route GET /cars/:id', () => {
    describe('when a car is found with success', () => {
      before(() => Sinon.stub(carModel.model, 'findOne').resolves(carMock.car as any));
      after(() => Sinon.restore());
  
      it('must return a status 200 and the found car', async () => {
        const response = await chai.request(app).get('/cars/4edd40c86762e0fb12000003');
        expect(response.status).to.be.eq(200);
        expect(response.body).to.be.deep.eq(carMock.car);
      });
    });

    describe('when the given id is not 24 characters long', () => {
      before(() => Sinon.stub(carModel.model, 'find').resolves(carMock.car as any));
      after(() => Sinon.restore());
  
      it('must return a status 400 and an id error message', async () => {
        const response = await chai.request(app).get('/cars/4edd40c86762e0fb12000003555');
        expect(response.status).to.be.eq(400);
        expect(response.body).haveOwnProperty('error');
      });
    });
  });

  describe('route PUT /cars/:id', () => {
    describe('when a car is updated with success', () => {
      before(() => Sinon.stub(carModel.model, 'findByIdAndUpdate').resolves(carMock.car as any));
      after(() => Sinon.restore());
  
      it('must return a status 200', async () => {
        const response = await chai.request(app).put('/cars/4edd40c86762e0fb12000003');
        expect(response.status).to.be.eq(200);
      });
    });

    describe('when the given id is not 24 characters long', () => {
      before(() => Sinon.stub(carModel.model, 'findByIdAndUpdate').resolves(carMock.car as any));
      after(() => Sinon.restore());
  
      it('must return a status 400 and an id error message', async () => {
        const response = await chai.request(app).put('/cars/4edd40c86762e0fb12000003555');
        expect(response.status).to.be.eq(400);
        expect(response.body).haveOwnProperty('error');
      });
    });
  });

  describe('route DELETE /cars/:id', () => {
    describe('when a car is deleted with success', () => {
      before(() => Sinon.stub(carModel.model, 'findByIdAndDelete').resolves(carMock.car as any));
      after(() => Sinon.restore());
  
      it('must return a status 204', async () => {
        const response = await chai.request(app).delete('/cars/4edd40c86762e0fb12000003');
        expect(response.status).to.be.eq(204);
      });
    });

    describe('when the given id is not 24 characters long', () => {
      before(() => Sinon.stub(carModel.model, 'findByIdAndDelete').resolves(carMock.car as any));
      after(() => Sinon.restore());
  
      it('must return a status 400 and an id error message', async () => {
        const response = await chai.request(app).delete('/cars/4edd40c86762e0fb12000003555');
        expect(response.status).to.be.eq(400);
        expect(response.body).haveOwnProperty('error');
      });
    });

    describe('when the given id is not registered', () => {
      before(() => Sinon.stub(carModel.model, 'findByIdAndDelete').resolves());
      after(() => Sinon.restore());
  
      it('must return a status 404 and a not found error message', async () => {
        const response = await chai.request(app).delete('/cars/4edd40c867t2e0fb12000004');
        expect(response.status).to.be.eq(404);
        expect(response.body).haveOwnProperty('error');
      });
    });
  });
});