import { z } from 'zod';

export const VehicleSchema = z.object({
  model: z.string({ 
    required_error: 'model is required',
    invalid_type_error: 'model must be a string',
  }).min(3, { message: 'model must have more than 3 characters' }),
  year: z.number({
    required_error: 'year is required',
    invalid_type_error: 'year must be a number',
  }).gte(1900, { message: 'year must be higher or equal to 1900' })
    .lte(2022, { message: 'year must be lower or equal to 2022' }),
  color: z.string({
    required_error: 'color is required',
    invalid_type_error: 'color must be a string',
  }).min(3, { message: 'color must have more than 3 characters' }),
  status: z.boolean({
    invalid_type_error: 'status must be a boolean',
  }).optional(),
  buyValue: z.number({
    required_error: 'buyValue is required',
    invalid_type_error: 'buyValue must be a number',
  }).int(),
});

export type Vehicle = z.infer<typeof VehicleSchema>;
