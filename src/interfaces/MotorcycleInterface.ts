import { z } from 'zod';
import { Vehicle, VehicleSchema } from './VehicleInterface';

export const MotorcycleSchema = z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number({
    required_error: 'engineCapacity is required',
    invalid_type_error: 'engineCapacity must be a number',
  }).int().positive()
    .lte(2500, { message: 'engineCapacity must be lower or equal to 2500' }),
}).merge(VehicleSchema);

export interface Motorcycle extends Vehicle, z.infer<typeof MotorcycleSchema> {}
