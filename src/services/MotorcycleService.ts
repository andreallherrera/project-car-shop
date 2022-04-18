import { 
  Motorcycle, 
  MotorcycleSchema } from '../interfaces/MotorcycleInterface';
import GenericService, { ServiceError } from './GenericService';
import MotorcycleModel from '../models/MotorcycleModel';

class MotorcycleService extends GenericService<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  create = async (
    body: Motorcycle,
  ): Promise<Motorcycle | null | ServiceError> => {
    const parsed = MotorcycleSchema.safeParse(body);
    if (!parsed.success) return { error: parsed.error };
    return this.model.create(body);
  };

  update = async (
    id: string, 
    body: Motorcycle,
  ): Promise<Motorcycle | null | ServiceError> => {
    const parsed = MotorcycleSchema.safeParse(body);
    if (!parsed.success) return { error: parsed.error };
    return this.model.update(id, body);
  };
}

export default MotorcycleService;