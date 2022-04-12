import { ZodError } from 'zod';
import Model from '../models/GenericDAO';
import { CarSchema } from '../interfaces/CarInterface';

export interface ServiceError {
  error: ZodError;
}

abstract class GenericService<T> {
  constructor(public model: Model<T>) { }

  async create(obj: T): Promise<T | null | ServiceError> {
    const parsed = CarSchema.safeParse(obj);
    if (!parsed.success) return { error: parsed.error };
    return this.model.create(obj);
  }

  async read(): Promise<T[]> {
    return this.model.read();
  }

  async readOne(id: string): Promise<T | null | ServiceError> {
    return this.model.readOne(id);
  }

  async update(id: string, obj: T): Promise<T | null | ServiceError> {
    return this.model.update(id, obj);
  }

  async delete(id: string): Promise<T | null | ServiceError> {
    return this.model.delete(id);
  }
}

export default GenericService;
