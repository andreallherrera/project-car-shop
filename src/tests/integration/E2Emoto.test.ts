import Sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import MotorcycleModel from '../../models/MotorcycleModel';
import motoMock from '../mocks/motorcycleMock';
import { Motorcycle } from '../../interfaces/MotorcycleInterface';

chai.use(chaiHttp);

const app = server.getApp();

describe('/Motorcycles routes', () => {
  const motorcycleModel = new MotorcycleModel();

  describe('route POST /motorcycles', () => {
    describe('when the Motorcycle is created with success', () => {
      before(() => Sinon.stub(motorcycleModel.model, 'create').resolves(motoMock.moto));
      after(() => Sinon.restore());
  
      it('must return a status 201 and the created Motorcycle', async () => {
        const response = await chai.request(app).post('/motorcycles').send(motoMock.params);
        expect(response.status).to.be.eq(201);
        expect(response.body).to.be.deep.eq(motoMock.moto);
      });
    });

    describe('when one of the params is invalid or it is missing', () => {
      before(() => Sinon.stub(motorcycleModel.model, 'create').resolves(motoMock.moto));
      after(() => Sinon.restore());
  
      it('must return a status 400 and an invalid error message', async () => {
        const response = await chai.request(app).post('/motorcycles').send(motoMock.invalid);
        expect(response.status).to.be.eq(400);
        expect(response.body).haveOwnProperty('error');
      });
    });

    describe('when the Motorcycle cannot be created - internal error', () => {
      before(() => Sinon.stub(motorcycleModel.model, 'create').resolves());
      after(() => Sinon.restore());
  
      it('must return a status 500 and an internal error message', async () => {
        const response = await chai.request(app).post('/motorcycles').send(motoMock.moto);
        expect(response.status).to.be.eq(500);
        expect(response.body).haveOwnProperty('error');
      });
    });
  });

  describe('route GET /motorcycles', () => {
    describe('when the Motorcycle list is returned with success', () => {
      before(() => Sinon.stub(motorcycleModel.model, 'find').resolves(motoMock.list as any));
      after(() => Sinon.restore());
  
      it('must return a status 200 and all the Motorcycles', async () => {
        const response = await chai.request(app).get('/motorcycles');
        expect(response.status).to.be.eq(200);
        expect(response.body).to.be.deep.eq(motoMock.list);
      });
    });

    describe('when the anything is found', () => {
      before(() => Sinon.stub(motorcycleModel.model, 'find').resolves());
      after(() => Sinon.restore());
  
      it('must return a status 404 and an not found error message', async () => {
        const response = await chai.request(app).get('/motorcycles');
        expect(response.status).to.be.eq(404);
        expect(response.body).haveOwnProperty('error');
      });
    });
  });

  describe('route GET /Motorcycles/:id', () => {
    describe('when a Motorcycle is found with success', () => {
      before(() => Sinon.stub(motorcycleModel.model, 'findOne').resolves(motoMock.moto as any));
      after(() => Sinon.restore());
  
      it('must return a status 200 and the found Motorcycle', async () => {
        const response = await chai.request(app).get('/motorcycles/4edd40c86762e0fb12000003');
        expect(response.status).to.be.eq(200);
        expect(response.body).to.be.deep.eq(motoMock.moto);
      });
    });

    describe('when the given id is not 24 characters long', () => {
      before(() => Sinon.stub(motorcycleModel.model, 'find').resolves(motoMock.moto as any));
      after(() => Sinon.restore());
  
      it('must return a status 400 and an id error message', async () => {
        const response = await chai.request(app).get('/motorcycles/4edd40c86762e0fb12000003555');
        expect(response.status).to.be.eq(400);
        expect(response.body).haveOwnProperty('error');
      });
    });
  });

  describe('route PUT /motorcycles/:id', () => {
    describe('when a Motorcycle is updated with success', () => {
      before(() => Sinon.stub(motorcycleModel.model, 'findByIdAndUpdate').resolves(motoMock.moto as any));
      after(() => Sinon.restore());
  
      it('must return a status 200', async () => {
        const response = await chai.request(app).put('/Motorcycles/4edd40c86762e0fb12000003');
        expect(response.status).to.be.eq(200);
      });
    });

    describe('when the given id is not 24 characters long', () => {
      before(() => Sinon.stub(motorcycleModel.model, 'findByIdAndUpdate').resolves(motoMock.moto as any));
      after(() => Sinon.restore());
  
      it('must return a status 400 and an id error message', async () => {
        const response = await chai.request(app).put('/motorcycles/4edd40c86762e0fb12000003555');
        expect(response.status).to.be.eq(400);
        expect(response.body).haveOwnProperty('error');
      });
    });
  });

  describe('route DELETE /Motorcycles/:id', () => {
    describe('when a Motorcycle is deleted with success', () => {
      before(() => Sinon.stub(motorcycleModel.model, 'findByIdAndDelete').resolves(motoMock.moto as any));
      after(() => Sinon.restore());
  
      it('must return a status 204', async () => {
        const response = await chai.request(app).delete('/motorcycles/4edd40c86762e0fb12000003');
        expect(response.status).to.be.eq(204);
      });
    });

    describe('when the given id is not 24 characters long', () => {
      before(() => Sinon.stub(motorcycleModel.model, 'findByIdAndDelete').resolves(motoMock.moto as any));
      after(() => Sinon.restore());
  
      it('must return a status 400 and an id error message', async () => {
        const response = await chai.request(app).delete('/motorcycles/4edd40c86762e0fb12000003555');
        expect(response.status).to.be.eq(400);
        expect(response.body).haveOwnProperty('error');
      });
    });

    describe('when the given id is not registered', () => {
      before(() => Sinon.stub(motorcycleModel.model, 'findByIdAndDelete').resolves());
      after(() => Sinon.restore());
  
      it('must return a status 404 and a not found error message', async () => {
        const response = await chai.request(app).delete('/motorcycles/4edd40c867t2e0fb12000004');
        expect(response.status).to.be.eq(404);
        expect(response.body).haveOwnProperty('error');
      });
    });
  });
});