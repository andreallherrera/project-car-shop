import { expect } from 'chai';
import Sinon from 'sinon';
import CarService from '../../../services/CarService';
import carMock from '../../mocks';

describe('CarService', () => {
  let carService = new CarService();

  describe('#create', () => {
    before(() => Sinon.stub(carService.model, 'create').resolves(carMock.car));
    after(() => Sinon.restore());

    it('must return the car created', async () => {
      const car = await carService.create(carMock.params);
      expect(car).to.be.deep.eq(carMock.car);
    });

    it('must return an error when the fields are invalid', async () => {
      const car = await carService.create(carMock.invalid);
      expect(car).to.haveOwnProperty('error');
    });
  });

  describe('#read', () => {
    before(() => Sinon.stub(carService.model, 'read').resolves(carMock.list as any));
    after(() => Sinon.restore());
  
    it('must return a Car list', async () => {
      const cars = await carService.read();
      expect(cars).to.deep.eq(carMock.list);
    });
  });

  describe('#readOne', () => {
    before(() => Sinon.stub(carService.model, 'readOne').resolves(carMock.car as any));
    after(() => Sinon.restore());
  
    it('must return a specific car', async () => {
      const car = await carService.readOne(carMock.car._id);
      expect(car).to.deep.eq(carMock.car);
    });
  });

  describe('#update', () => {
    before(() => Sinon.stub(carService.model, 'update').resolves(carMock.updated as any));
    after(() => Sinon.restore());

    it('must return the updated car', async () => {
      const car = await carService.update(carMock.car._id, carMock.updated);
      expect(car).to.deep.eq(carMock.updated);
    });
  });

  describe('#delete', () => {
    describe('when the carId exists', () => { 
      before(() => Sinon.stub(carService.model, 'delete').resolves(carMock.car as any));
      after(() => Sinon.restore());
  
      it('must return the deleted car', async () => {
        const car = await carService.delete(carMock.car._id);
        expect(car).to.deep.eq(carMock.car);
      });
    });

    describe('when the carId does not exists', () => { 
      before(() => Sinon.stub(carService.model, 'delete').resolves(null));
      after(() => Sinon.restore());
  
      it('must return null', async () => {
        const car = await carService.delete(carMock.car._id);
        expect(car).to.be.null;
      });
    });
  });
});