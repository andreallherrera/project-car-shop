import { expect } from 'chai';
import Sinon from 'sinon';
import { Motorcycle } from '../../../interfaces/MotorcycleInterface';
import MotorcycleModel from '../../../models/MotorcycleModel';
import motoMock from '../../mocks/motorcycleMock';

describe.only('MotorcycleModel', () => {
  let motorcycleModel = new MotorcycleModel();

  describe('#create', () => {
    before(() => Sinon.stub(motorcycleModel.model, 'create').resolves(motoMock.moto));
    after(() => Sinon.restore());

    it('must return the motorcycle created', async () => {
      const motorcycle = await motorcycleModel.create(motoMock.params as Motorcycle);
      expect(motorcycle).to.deep.eq(motoMock.moto);
    });
  });

  describe('#read', () => {
    describe('When db has data', () => {
      before(() => Sinon.stub(motorcycleModel.model, 'find').resolves(motoMock.list as any));
      after(() => Sinon.restore());
  
      it('must return a list of motorcycles', async () => {
        const motorcycles = await motorcycleModel.read();
        expect(motorcycles).to.deep.eq(motoMock.list);
      });
    });

    describe('When db does not have data', () => {
      before(() => Sinon.stub(motorcycleModel.model, 'find').resolves([]));
      after(() => Sinon.restore());
  
      it('must return an empty list', async () => {
        const motorcycles = await motorcycleModel.read();
        expect(motorcycles).to.deep.eq([]);
      });
    });
  });

  describe('#readOne', () => {
    describe('when the motorcycleId exists', () => {
      before(() => Sinon.stub(motorcycleModel.model, 'findOne').resolves(motoMock.moto as any));
      after(() => Sinon.restore());
  
      it('must return a specific motorcycle', async () => {
        const motorcycle = await motorcycleModel.readOne(motoMock.moto._id);
        expect(motorcycle).to.deep.eq(motoMock.moto);
      });
    });

    describe('when the motorcycleId does not exists', () => {
      before(() => Sinon.stub(motorcycleModel.model, 'findOne').resolves(null));
      after(() => Sinon.restore());

      it('must return null', async () => {
        const motorcycle = await motorcycleModel.readOne(motoMock.moto._id);
        expect(motorcycle).to.be.null;
      });
    });
  });

  describe('#update', () => {
    describe('when the motorcycleId exists', () => { 
      before(() => Sinon.stub(motorcycleModel.model, 'findByIdAndUpdate').resolves(motoMock.updated as any));
      after(() => Sinon.restore());
  
      it('must return the updated motorcycle', async () => {
        const motorcycle = await motorcycleModel.update(motoMock.moto._id, motoMock.updated as Motorcycle);
        expect(motorcycle).to.deep.eq(motoMock.updated);
      });
    });

    describe('when the motorcycleId does not exists', () => { 
      before(() => Sinon.stub(motorcycleModel.model, 'findByIdAndUpdate').resolves(null));
      after(() => Sinon.restore());
  
      it('must return null', async () => {
        const motorcycle = await motorcycleModel.update(motoMock.moto._id, motoMock.updated as Motorcycle);
        expect(motorcycle).to.be.null;
      });
    });
  });

  describe('#delete', () => {
    describe('when the motorcycleId exists', () => { 
      before(() => Sinon.stub(motorcycleModel.model, 'findByIdAndDelete').resolves(motoMock.moto as any));
      after(() => Sinon.restore());
  
      it('must return the deleted motorcycle', async () => {
        const motorcycle = await motorcycleModel.delete(motoMock.moto._id);
        expect(motorcycle).to.deep.eq(motoMock.moto);
      });
    });

    describe('when the motorcycleId does not exists', () => { 
      before(() => Sinon.stub(motorcycleModel.model, 'findByIdAndDelete').resolves(null));
      after(() => Sinon.restore());
  
      it('must return null', async () => {
        const motorcycle = await motorcycleModel.delete(motoMock.moto._id);
        expect(motorcycle).to.be.null;
      });
    });
  });
});