import { expect } from 'chai';
import Sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import carMock from '../../mocks';

describe('CarModel', () => {
  let carModel = new CarModel();
  describe('#create', () => {
    before(() => Sinon.stub(carModel.model, 'create').resolves(carMock.car));
    after(() => Sinon.restore());

    it('must return the car created', async () => {
      const car = await carModel.create(carMock.params);
      expect(car).to.deep.eq(carMock.car);
    });
  });

  describe('#read', () => {
    describe('When db has data', () => {
      before(() => Sinon.stub(carModel.model, 'find').resolves(carMock.list as any));
      after(() => Sinon.restore());
  
      it('must return a Car list', async () => {
        const cars = await carModel.read();
        expect(cars).to.deep.eq(carMock.list);
      });
    });

    describe('When db does not have data', () => {
      before(() => Sinon.stub(carModel.model, 'find').resolves([]));
      after(() => Sinon.restore());
  
      it('must return a Car list', async () => {
        const cars = await carModel.read();
        expect(cars).to.deep.eq([]);
      });
    });
  });

  describe('#readOne', () => {
    describe('when the carId exists', () => {
      before(() => Sinon.stub(carModel.model, 'findOne').resolves(carMock.car as any));
      after(() => Sinon.restore());
  
      it('must return a specific car', async () => {
        const car = await carModel.readOne(carMock.car._id);
        expect(car).to.deep.eq(carMock.car);
      });
    });

    describe('when the carId does not exists', () => {
      before(() => Sinon.stub(carModel.model, 'findOne').resolves(null));
      after(() => Sinon.restore());

      it('must return null', async () => {
        const car = await carModel.readOne(carMock.car._id);
        expect(car).to.be.null;
      });
    });
  });

  describe('#update', () => {
    describe('when the carId exists', () => { 
      before(() => Sinon.stub(carModel.model, 'findByIdAndUpdate').resolves(carMock.updated as any));
      after(() => Sinon.restore());
  
      it('must return the updated car', async () => {
        const car = await carModel.update(carMock.car._id, carMock.updated);
        expect(car).to.deep.eq(carMock.updated);
      });
    });

    describe('when the carId does not exists', () => { 
      before(() => Sinon.stub(carModel.model, 'findByIdAndUpdate').resolves(null));
      after(() => Sinon.restore());
  
      it('must return null', async () => {
        const car = await carModel.update(carMock.car._id, carMock.updated);
        expect(car).to.be.null;
      });
    });
  });

  describe('#delete', () => {
    describe('when the carId exists', () => { 
      before(() => Sinon.stub(carModel.model, 'findByIdAndDelete').resolves(carMock.car as any));
      after(() => Sinon.restore());
  
      it('must return the deleted car', async () => {
        const car = await carModel.delete(carMock.car._id);
        expect(car).to.deep.eq(carMock.car);
      });
    });

    describe('when the carId does not exists', () => { 
      before(() => Sinon.stub(carModel.model, 'findByIdAndDelete').resolves(null));
      after(() => Sinon.restore());
  
      it('must return null', async () => {
        const car = await carModel.delete(carMock.car._id);
        expect(car).to.be.null;
      });
    });
  });
});