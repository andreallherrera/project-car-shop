import { Schema, model as createModel, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import genericDAO from './genericDAO';

interface CarDocument extends Car, Document { }

const CarSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  seatsQty: Number,
  doorsQty: Number,
});

class CarModel extends genericDAO<Car> {
  constructor(model = createModel('Cars', CarSchema)) {
    super(model);
  }
}

export default CarModel;
