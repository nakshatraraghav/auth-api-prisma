import { z } from "zod";

import * as errors from "./product.error";

export const createProductSchema = z.object({
  name: z
    .string({
      required_error: errors.name_errors.required_error,
      invalid_type_error: errors.name_errors.invalid_type,
    })
    .min(2, errors.name_errors.min_length)
    .max(50, errors.name_errors.max_length),
  description: z
    .string({
      invalid_type_error: errors.description_errors.invalid_type,
    })
    .min(6, errors.description_errors.min_length)
    .max(100, errors.description_errors.max_length)
    .optional(),
  price: z
    .number({
      required_error: errors.price_errors.required_error,
      invalid_type_error: errors.price_errors.invalid_type,
    })
    .min(0, errors.price_errors.min_value)
    .max(10000000, errors.price_errors.max_value),
  discount: z
    .number({
      invalid_type_error: errors.description_errors.invalid_type,
    })
    .min(1, errors.description_errors.min_length)
    .max(99, errors.description_errors.max_length)
    .optional(),
});

export type createProductBodyType = z.infer<typeof createProductSchema>;
