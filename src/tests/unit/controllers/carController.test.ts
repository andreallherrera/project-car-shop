import Sinon from 'sinon';
import carMock from '../../mocks';
import CarController from '../../../controllers/CarController';
import { Response, Request } from 'express';
import { expect } from 'chai';
import { RequestWithBody } from '../../../controllers/GenericController';
import { Car } from '../../../interfaces/CarInterface';

describe('CarController', () => {
  let carController = new CarController();

  describe('Get the /cars route', () => {
    it('must return the /cars route', () => {
      const route = carController.route;
      expect(route).to.be.eq('/cars');
    });
  });

  describe('#create', () => {
    describe('when the fields in params are correct', () => {
      const res = {} as Response;
      const req = {} as RequestWithBody<Car>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'create').resolves(carMock.car);
      });
      after(() => Sinon.restore());
  
      it('must call status function with value 200', async () => {
        await carController.create(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(201));
        expect((res.json as Sinon.SinonStub).calledWith(carMock.car));
      });
    });

    describe('when the fields in params are correct', () => {
      const res = {} as Response;
      const req = {} as RequestWithBody<Car>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'create').resolves(carMock.zodError as any);
      });
      after(() => Sinon.restore());
  
      it('must call status function with value 400', async () => {
        await carController.create(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(400));
        expect((res.json as Sinon.SinonStub).calledWith(carMock.zodError));
      });
    }); 

    describe('when there is an internal error', () => {
      const res = {} as Response;
      const req = {} as RequestWithBody<Car>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'create').throws();
      });
      after(() => Sinon.restore());
  
      it('must call status function with value 500', async () => {
        await carController.create(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(500));
      });
    });

    describe('when not received a response from service', () => {
      const res = {} as Response;
      const req = {} as RequestWithBody<Car>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'create').resolves(null);
      });
      after(() => Sinon.restore());
  
      it('must call status function with value 500', async () => {
        await carController.create(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(500));
      });
    });
  });

  describe('#read', () => {
    describe('when returned a list of cars', () => {
      const res = {} as Response;
      const req = {} as Request;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'read').resolves(carMock.list);
      });
      after(() => Sinon.restore());
    
      it('must call status function with value 200', async () => {
        await carController.read(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(200));
        expect((res.json as Sinon.SinonStub).calledWith(carMock.list));
      });
    });

    describe('when there is an internal error', () => {
      const res = {} as Response;
      const req = {} as Request;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'read').throws();
      });
      after(() => Sinon.restore());
  
      it('must call status function with value 500', async () => {
        await carController.read(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(500));
      });
    });
  });

  describe('#readOne', () => {
    describe('when a Car is found', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb12000003' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'readOne').resolves(carMock.car);
      });
      after(() => Sinon.restore());
    
      it('must call status function with value 200', async () => {
        await carController.readOne(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(200));
        expect((res.json as Sinon.SinonStub).calledWith(carMock.car));
      });
    });

    describe('when a car is not found', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb12000003' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'readOne').resolves(null);
      });
      after(() => Sinon.restore());
      it('must call status with value 404 and a notFound message', async () => {
        await carController.readOne(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(404));
      });
    });

    describe('when the id is invalid', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb1200000366' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'readOne').resolves(carMock.car);
      });
      after(() => Sinon.restore());
      it('must call status with value 400 and a error message', async () => {
        await carController.readOne(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(400));
        expect((res.json as Sinon.SinonStub).calledWith({
          error: 'Id must have 24 hexadecimal characters'
        }));
      });
    });

    describe('when there is an internal error', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb1200000366' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'readOne').throws();
      });
      after(() => Sinon.restore());
  
      it('must call status function with value 500', async () => {
        await carController.readOne(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(500));
      });
    });
  });

  describe('#update', () => {
    describe('when the car is updated', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb12000003' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'update').resolves(carMock.updated);
      });
      after(() => Sinon.restore());
  
      it('must call status function with value 200', async () => {
        await carController.update(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(200));
        expect((res.json as Sinon.SinonStub).calledWith(carMock.updated));
      });
    });

    describe('when a car is not found', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb12000003' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'update').resolves(null);
      });
      after(() => Sinon.restore());
      it('must call status with value 404 and a notFound message', async () => {
        await carController.update(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(404));
      });
    });

    describe('when the id is invalid', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb1200000366' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'update').resolves(carMock.car);
      });
      after(() => Sinon.restore());
      it('must call status with value 400 and a error message', async () => {
        await carController.update(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(400));
        expect((res.json as Sinon.SinonStub).calledWith({
          error: 'Id must have 24 hexadecimal characters'
        }));
      });
    });

    describe('when there is an internal error', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb1200000366' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'update').throws();
      });
      after(() => Sinon.restore());
  
      it('must call status function with value 500', async () => {
        await carController.update(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(500));
      });
    });
  });

  describe('#delete', () => {
    describe('when the car is deleted', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb12000003' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'delete').resolves(carMock.car);
      });
      after(() => Sinon.restore());
  
      it('must call status function with value 200', async () => {
        await carController.delete(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(200));
        expect((res.json as Sinon.SinonStub).calledWith(carMock.car));
      });
    });

    describe('when a car is not found', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb12000003' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'delete').resolves(null);
      });
      after(() => Sinon.restore());
      it('must call status with value 404 and a notFound message', async () => {
        await carController.delete(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(404));
      });
    });

    describe('when the id is invalid', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb1200000366' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'delete').resolves(carMock.car);
      });
      after(() => Sinon.restore());
      it('must call status with value 400 and a error message', async () => {
        await carController.delete(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(400));
        expect((res.json as Sinon.SinonStub).calledWith({
          error: 'Id must have 24 hexadecimal characters'
        }));
      });
    });

    describe('when there is an internal error', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb1200000366' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(carController.service, 'delete').throws();
      });
      after(() => Sinon.restore());
  
      it('must call status function with value 500', async () => {
        await carController.delete(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(500));
      });
    });
  });
});