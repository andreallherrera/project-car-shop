import { z } from 'zod';
import { Vehicle, VehicleSchema } from './VehicleInterface';

export const CarSchema = z.object({
  seatsQty: z.number({
    required_error: 'seatsQty is required',
    invalid_type_error: 'seatsQty must be a number',
  }).gte(2, { message: 'seatsQty must be higher or equal to 2' })
    .lte(7, { message: 'seatsQty must be lower or equal to 7' }),
  doorsQty: z.number({
    required_error: 'doorsQty is required',
    invalid_type_error: 'doorsQty must be a number',
  }).gte(2, { message: 'doorsQty must be higher or equal to 2' })
    .lte(4, { message: 'doorsQty must be lower or equal to 4' }),
}).merge(VehicleSchema);

export interface Car extends Vehicle, z.infer<typeof CarSchema> {}
