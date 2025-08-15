import { z } from "zod";
import { COUNTRIES, LOAD_TYPES } from "../constants/postLoadConstants";

// Schema to validate the Post Load form
export const PostLoadFormSchema = z
  .object({
    sourceCountry: z
      .string()
      .min(1, "Please select a source country")
      .refine((v) => COUNTRIES.includes(v), {
        message: "Please select a valid country",
      }),
    destinationCountry: z
      .string()
      .min(1, "Please select a destination country")
      .refine((v) => COUNTRIES.includes(v), {
        message: "Please select a valid country",
      }),
    // Stored as string in UI, coerced to number for validation
    weightKg: z.coerce
      .number()
      .refine((n) => Number.isFinite(n), "Enter a valid weight")
      .gt(0, "Weight must be greater than 0"),
    loadType: z
      .string()
      .min(1, "Please select a load type")
      .refine((v) => LOAD_TYPES.includes(v), {
        message: "Please select a valid load type",
      }),
    materialType: z.string().min(2, "Material type must be at least 2 characters"),
    scheduledDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/u, "Use format YYYY-MM-DD")
      .refine((value) => {
        const [y, m, d] = value.split("-").map((n) => Number(n));
        const date = new Date(y, m - 1, d);
        if (Number.isNaN(date.getTime())) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        return date.getTime() >= today.getTime();
      }, "Scheduled date cannot be in the past"),
    hsnCode: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (!value) return true;
          if (value.length === 0) return true;
          // Common HSN codes are 4, 6 or 8 digits; accept 4-8 digits
          return /^\d{4,8}$/u.test(value);
        },
        { message: "HSN code must be 4-8 digits if provided" }
      ),
  })
  .superRefine((val, ctx) => {
    if (
      val.sourceCountry &&
      val.destinationCountry &&
      val.sourceCountry === val.destinationCountry
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["destinationCountry"],
        message: "Destination must be different from source",
      });
    }
  });

export type PostLoadFormValues = z.infer<typeof PostLoadFormSchema>;

export type PostLoadFieldErrors = Partial<
  Record<
    | "sourceCountry"
    | "destinationCountry"
    | "weightKg"
    | "loadType"
    | "materialType"
    | "scheduledDate"
    | "hsnCode",
    string
  >
>;

export function extractFieldErrors(
  result: ReturnType<typeof PostLoadFormSchema.safeParse>
): PostLoadFieldErrors {
  if (result.success) return {};
  const errors: PostLoadFieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof PostLoadFieldErrors | undefined;
    if (key && !errors[key]) {
      errors[key] = issue.message;
    }
  }
  return errors;
}


