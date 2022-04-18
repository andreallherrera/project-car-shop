import { ZodError } from 'zod';
import Model from '../models/GenericDAO';

export interface ServiceError {
  error: ZodError;
}

abstract class GenericService<T> {
  constructor(public model: Model<T>) { }

  abstract create(obj: T): Promise<T | null | ServiceError>;

  async read(): Promise<T[]> {
    return this.model.read();
  }

  async readOne(id: string): Promise<T | null | ServiceError> {
    return this.model.readOne(id);
  }

  abstract update(id: string, obj: T): Promise<T | null | ServiceError>;

  async delete(id: string): Promise<T | null | ServiceError> {
    return this.model.delete(id);
  }
}

export default GenericService;
