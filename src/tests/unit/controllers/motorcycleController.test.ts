import Sinon from 'sinon';
import motoMock from '../../mocks/motorcycleMock';
import MotorcycleController from '../../../controllers/MotorcycleController';
import { Response, Request } from 'express';
import { expect } from 'chai';
import { RequestWithBody } from '../../../controllers/GenericController';
import { Motorcycle } from '../../../interfaces/MotorcycleInterface';

describe('motorcycleController', () => {
  let motorcycleController = new MotorcycleController();

  describe('Get the /motorcycles route', () => {
    it('must return the /motorcycles route', () => {
      const route = motorcycleController.route;
      expect(route).to.be.eq('/motorcycles');
    });
  });

  describe('#create', () => {
    describe('when the fields in params are correct', () => {
      const res = {} as Response;
      const req = {} as RequestWithBody<Motorcycle>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(motorcycleController.service, 'create').resolves(motoMock.moto as Motorcycle);
      });
      after(() => Sinon.restore());
  
      it('must call status function with value 200', async () => {
        await motorcycleController.create(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(201));
        expect((res.json as Sinon.SinonStub).calledWith(motoMock.moto));
      });
    });

    describe('when the fields in params are correct', () => {
      const res = {} as Response;
      const req = {} as RequestWithBody<Motorcycle>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(motorcycleController.service, 'create').resolves(motoMock.zodError as any);
      });
      after(() => Sinon.restore());
  
      it('must call status function with value 400', async () => {
        await motorcycleController.create(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(400));
        expect((res.json as Sinon.SinonStub).calledWith(motoMock.zodError));
      });
    }); 

    describe('when there is an internal error', () => {
      const res = {} as Response;
      const req = {} as RequestWithBody<Motorcycle>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(motorcycleController.service, 'create').throws();
      });
      after(() => Sinon.restore());
  
      it('must call status function with value 500', async () => {
        await motorcycleController.create(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(500));
      });
    });

    describe('when not received a response from service', () => {
      const res = {} as Response;
      const req = {} as RequestWithBody<Motorcycle>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(motorcycleController.service, 'create').resolves(null);
      });
      after(() => Sinon.restore());
  
      it('must call status function with value 500', async () => {
        await motorcycleController.create(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(500));
      });
    });
  });

  describe('#read', () => {
    describe('when returned a list of motorcycles', () => {
      const res = {} as Response;
      const req = {} as Request;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(motorcycleController.service, 'read').resolves(motoMock.list as Motorcycle[]);
      });
      after(() => Sinon.restore());
    
      it('must call status function with value 200', async () => {
        await motorcycleController.read(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(200));
        expect((res.json as Sinon.SinonStub).calledWith(motoMock.list));
      });
    });

    describe('when there is an internal error', () => {
      const res = {} as Response;
      const req = {} as Request;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(motorcycleController.service, 'read').throws();
      });
      after(() => Sinon.restore());
  
      it('must call status function with value 500', async () => {
        await motorcycleController.read(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(500));
      });
    });
  });

  describe('#readOne', () => {
    describe('when a motorcycle is found', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb12000003' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(motorcycleController.service, 'readOne').resolves(motoMock.moto as Motorcycle);
      });
      after(() => Sinon.restore());
    
      it('must call status function with value 200', async () => {
        await motorcycleController.readOne(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(200));
        expect((res.json as Sinon.SinonStub).calledWith(motoMock.moto));
      });
    });

    describe('when a motorcycle is not found', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb12000003' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(motorcycleController.service, 'readOne').resolves(null);
      });
      after(() => Sinon.restore());
      it('must call status with value 404 and a notFound message', async () => {
        await motorcycleController.readOne(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(404));
      });
    });

    describe('when the id is invalid', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb1200000366' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(motorcycleController.service, 'readOne').resolves(motoMock.moto as Motorcycle);
      });
      after(() => Sinon.restore());
      it('must call status with value 400 and a error message', async () => {
        await motorcycleController.readOne(req, res);
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
        Sinon.stub(motorcycleController.service, 'readOne').throws();
      });
      after(() => Sinon.restore());
  
      it('must call status function with value 500', async () => {
        await motorcycleController.readOne(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(500));
      });
    });
  });

  describe('#update', () => {
    describe('when the motorcycle is updated', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb12000003' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(motorcycleController.service, 'update').resolves(motoMock.updated as Motorcycle);
      });
      after(() => Sinon.restore());
  
      it('must call status function with value 200', async () => {
        await motorcycleController.update(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(200));
        expect((res.json as Sinon.SinonStub).calledWith(motoMock.updated));
      });
    });

    describe('when a motorcycle is not found', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb12000003' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(motorcycleController.service, 'update').resolves(null);
      });
      after(() => Sinon.restore());
      it('must call status with value 404 and a notFound message', async () => {
        await motorcycleController.update(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(404));
      });
    });

    describe('when the id is invalid', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb1200000366' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(motorcycleController.service, 'update').resolves(motoMock.moto as Motorcycle);
      });
      after(() => Sinon.restore());
      it('must call status with value 400 and a error message', async () => {
        await motorcycleController.update(req, res);
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
        Sinon.stub(motorcycleController.service, 'update').throws();
      });
      after(() => Sinon.restore());
  
      it('must call status function with value 500', async () => {
        await motorcycleController.update(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(500));
      });
    });
  });

  describe('#delete', () => {
    describe('when the motorcycle is deleted', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb12000003' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(motorcycleController.service, 'delete').resolves(motoMock.moto as Motorcycle);
      });
      after(() => Sinon.restore());
  
      it('must call status function with value 200', async () => {
        await motorcycleController.delete(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(200));
        expect((res.json as Sinon.SinonStub).calledWith(motoMock.moto));
      });
    });

    describe('when a motorcycle is not found', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb12000003' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(motorcycleController.service, 'delete').resolves(null);
      });
      after(() => Sinon.restore());
      it('must call status with value 404 and a notFound message', async () => {
        await motorcycleController.delete(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(404));
      });
    });

    describe('when the id is invalid', () => {
      const res = {} as Response;
      const req = { params: { id: '4edd40c86762e0fb1200000366' } } as Request<{ id: string }>;
  
      before(() => {
        res.status = Sinon.stub().returns(res);
        res.json = Sinon.stub();
        Sinon.stub(motorcycleController.service, 'delete').resolves(motoMock.moto as Motorcycle);
      });
      after(() => Sinon.restore());
      it('must call status with value 400 and a error message', async () => {
        await motorcycleController.delete(req, res);
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
        Sinon.stub(motorcycleController.service, 'delete').throws();
      });
      after(() => Sinon.restore());
  
      it('must call status function with value 500', async () => {
        await motorcycleController.delete(req, res);
        expect((res.status as Sinon.SinonStub).calledWith(500));
      });
    });
  });
});