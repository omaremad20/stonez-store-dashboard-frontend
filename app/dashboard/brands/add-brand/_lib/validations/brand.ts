import { z } from "zod";

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 32;
export const DESCRIPTION_MIN_LENGTH = 2;
export const DESCRIPTION_MAX_LENGTH = 256;

/**
 * A brand image that has already been validated, compressed, and
 * converted to WebP on the client. This is what lives in form state —
 * never the raw `File` the user picked.
 */
export interface ProcessedBrandImage {
  file: File;
  previewUrl: string;
  originalName: string;
  sizeBytes: number;
  mimeType: string;
}

const nameSchema = z
  .string()
  .trim()
  .min(1, "Brand name is required.")
  .min(
    NAME_MIN_LENGTH,
    `Brand name must be at least ${NAME_MIN_LENGTH} characters.`,
  )
  .max(
    NAME_MAX_LENGTH,
    `Brand name must be ${NAME_MAX_LENGTH} characters or less.`,
  );

const descriptionSchema = z
  .string()
  .trim()
  .max(
    DESCRIPTION_MAX_LENGTH,
    `Description must be ${DESCRIPTION_MAX_LENGTH} characters or less.`,
  )
  .optional()
  // Empty / whitespace-only description is treated as "not provided".
  .transform((val) => (val && val.length > 0 ? val : undefined))
  .refine((val) => val === undefined || val.length >= DESCRIPTION_MIN_LENGTH, {
    message: `Description must be at least ${DESCRIPTION_MIN_LENGTH} characters.`,
  });

const imageSchema = z
  .custom<ProcessedBrandImage | null | undefined>()
  .refine((val): val is ProcessedBrandImage => Boolean(val), {
    message: "Brand image is required.",
  });

export const addBrandFormSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
  is_active: z.boolean(),
  image: imageSchema,
});

// Values as the user types them (pre-validation) — what React Hook Form
// actually stores in its internal state.
export type AddBrandFormInput = z.input<typeof addBrandFormSchema>;

// Values after Zod has validated/transformed them — what the submit
// handler receives. `image` is guaranteed present here.
export type AddBrandFormOutput = z.output<typeof addBrandFormSchema>;

export const addBrandFormDefaultValues: AddBrandFormInput = {
  name: "",
  description: "",
  is_active: true,
  image: undefined,
};
