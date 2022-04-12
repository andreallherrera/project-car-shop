import { Car } from '../interfaces/CarInterface';
import GenericService from './GenericService';
import CarModel from '../models/CarModel';

class CarService extends GenericService<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }
}

export default CarService;