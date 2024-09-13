import { z } from "zod";

// Validation schema for details
const detailsValidation = z.object({
  level: z.string({
    required_error: "Level is required",
    invalid_type_error: "Name must be a string",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
});

// Validation schema for tags
const tagValidation = z.object({
  name: z.string({
    required_error: "Tag name is required",
  }),
  isDeleted: z.boolean().optional().default(false),
});

// Main validation schema for course
const createCourseValidation = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Course title is required",
        invalid_type_error: "Title must be a string",
      })
      .max(20, { message: "Title cannot exceed 20 characters" }),
    instructor: z.string({
      required_error: "Instructor is required",
      invalid_type_error: "Instructor must be a string",
    }),
    categoryId: z.string(),
    price: z.number().positive({ message: "Price must be a positive number" }),
    tags: z.array(tagValidation).optional(),
    startDate: z.string({
      required_error: "Start date is required",
    }),
    endDate: z.string({
      required_error: "End date is required",
    }),
    language: z.string({
      required_error: "Language is required",
    }),
    provider: z.string({
      required_error: "Provider is required",
      invalid_type_error: "Provider must be a string",
    }),
    durationInWeeks: z
      .number()
      .positive({ message: "Duration in weeks must be a positive number" })
      .optional(),
    details: detailsValidation,
    isDeleted: z.boolean().optional().default(false),
    createdBy: z.string(),
  }),
});

const updateDetailsValidation = z.object({
  level: z.string({
    required_error: "Level is required",
    invalid_type_error: "Name must be a string",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
});

// Validation schema for tags
const updateTagValidation = z.object({
  name: z
    .string({
      required_error: "Tag name is required",
    })
    .optional(),
  isDeleted: z.boolean().optional().default(false),
});

const updateCourseValidation = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Course title is required",
        invalid_type_error: "Title must be a string",
      })
      .max(20, { message: "Title cannot exceed 20 characters" })
      .optional(),
    instructor: z
      .string({
        required_error: "Instructor is required",
        invalid_type_error: "Instructor must be a string",
      })
      .optional(),
    categoryId: z.string().optional(),
    price: z
      .number()
      .positive({ message: "Price must be a positive number" })
      .optional(),
    tags: z.array(updateTagValidation).optional(),
    startDate: z
      .string({
        required_error: "Start date is required",
      })
      .optional(),
    endDate: z
      .string({
        required_error: "End date is required",
      })
      .optional(),
    language: z
      .string({
        required_error: "Language is required",
      })
      .optional(),
    provider: z
      .string({
        required_error: "Provider is required",
        invalid_type_error: "Provider must be a string",
      })
      .optional(),
    durationInWeeks: z
      .number()
      .positive({ message: "Duration in weeks must be a positive number" })
      .optional(),
    details: updateDetailsValidation,
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const courseValidations = {
  createCourseValidation,
  updateCourseValidation,
};
