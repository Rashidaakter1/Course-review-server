import z from "zod";

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    isDeleted: z.boolean().optional().default(false),
    createdBy: z.string(),
  }),
});
const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    isDeleted: z.boolean().optional().default(false),
    createdBy: z.string(),
  }),
});

export const categoryValidationSchema = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
