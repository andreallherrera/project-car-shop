import { expect } from 'chai';
import Sinon from 'sinon';
import { Motorcycle } from '../../../interfaces/MotorcycleInterface';
import MotorcycleService from '../../../services/MotorcycleService';
import motoMock from '../../mocks/motorcycleMock';

describe('MotorcycleService', () => {
  let motorcycleService = new MotorcycleService();

  describe('#create', () => {
    before(() => Sinon.stub(motorcycleService.model, 'create').resolves(motoMock.moto as Motorcycle));
    after(() => Sinon.restore());

    it('must return the motorcycle created', async () => {
      const moto = await motorcycleService.create(motoMock.params as Motorcycle);
      expect(moto).to.be.deep.eq(motoMock.moto);
    });

    it('must return an error when the fields are invalid', async () => {
      const moto = await motorcycleService.create(motoMock.invalid as any);
      expect(moto).to.haveOwnProperty('error');
    });
  });

  describe('#read', () => {
    before(() => Sinon.stub(motorcycleService.model, 'read').resolves(motoMock.list as Motorcycle[]));
    after(() => Sinon.restore());
  
    it('must return a list of motorcycles', async () => {
      const motos = await motorcycleService.read();
      expect(motos).to.deep.eq(motoMock.list);
    });
  });

  describe('#readOne', () => {
    before(() => Sinon.stub(motorcycleService.model, 'readOne').resolves(motoMock.moto as Motorcycle));
    after(() => Sinon.restore());
  
    it('must return a specific moto', async () => {
      const moto = await motorcycleService.readOne(motoMock.moto._id);
      expect(moto).to.deep.eq(motoMock.moto);
    });
  });

  describe('#update', () => {
    before(() => Sinon.stub(motorcycleService.model, 'update').resolves(motoMock.updated as Motorcycle));
    after(() => Sinon.restore());

    it('must return the updated moto', async () => {
      const moto = await motorcycleService.update(motoMock.moto._id, motoMock.updated as Motorcycle);
      expect(moto).to.deep.eq(motoMock.updated);
    });

    it('must return an error when the fields are invalid', async () => {
      const moto = await motorcycleService.update(motoMock.moto._id, motoMock.invalid as any);
      expect(moto).to.haveOwnProperty('error');
    });
  });

  describe('#delete', () => {
    describe('when the motoId exists', () => { 
      before(() => Sinon.stub(motorcycleService.model, 'delete').resolves(motoMock.moto as Motorcycle));
      after(() => Sinon.restore());
  
      it('must return the deleted moto', async () => {
        const moto = await motorcycleService.delete(motoMock.moto._id);
        expect(moto).to.deep.eq(motoMock.moto);
      });
    });

    describe('when the motoId does not exists', () => { 
      before(() => Sinon.stub(motorcycleService.model, 'delete').resolves(null));
      after(() => Sinon.restore());
  
      it('must return null', async () => {
        const moto = await motorcycleService.delete(motoMock.moto._id);
        expect(moto).to.be.null;
      });
    });
  });
});