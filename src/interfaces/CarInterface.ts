import { z } from 'zod';
import { Vehicle } from './VehicleInterface';

export const CarSchema = z.object({
  seatsQty: z.number().gte(2).lte(7),
  doorsQty: z.number().gte(2).lte(4),
});

export interface Car extends Vehicle, z.infer<typeof CarSchema> {}
