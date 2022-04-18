import { Schema, model as createModel, Document } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import genericDAO from './GenericDAO';

interface MotorcycleDocument extends Motorcycle, Document { }

const MotorcycleSchema = new Schema<MotorcycleDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

class MotorcycleModel extends genericDAO<Motorcycle> {
  constructor(model = createModel('Motorcycles', MotorcycleSchema)) {
    super(model);
  }
}

export default MotorcycleModel;
