import { Car, CarSchema } from '../interfaces/CarInterface';
import GenericService, { ServiceError } from './GenericService';
import CarModel from '../models/CarModel';

class CarService extends GenericService<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (body: Car): Promise<Car | null | ServiceError> => {
    const parsed = CarSchema.safeParse(body);
    if (!parsed.success) return { error: parsed.error };
    return this.model.create(body);
  };

  update = async (
    id: string, 
    body: Car,
  ): Promise<Car | null | ServiceError> => {
    const parsed = CarSchema.safeParse(body);
    if (!parsed.success) return { error: parsed.error };
    return this.model.update(id, body);
  };
}

export default CarService;