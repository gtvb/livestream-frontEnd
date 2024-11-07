import { z } from "zod"
 
export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string({ required_error: "Password is required" })
    .min(1, "Password is required")
    // .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export const signupSchema = z.object({
  username: z.string({ required_error: "Username is required" })
    .min(1, "Username is required"),
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string({ required_error: "Password is required" })
    .min(1, "Password is required")
    // .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: z.string({ required_error: "Password Confirmation is required" })
    .min(1, "Password Confirmation is required")
    // .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirmPassword']
    });
  }
});

export const createLiveStreamSchema = z.object({
  name: z.string({ required_error: "Name is required" })
    .min(1, "Name is required")
})


export const liveStreamSchema = z.object({
  id: z.string().optional(), // ObjectID as string for JSON serialization
  name: z.string(),

  stream_key: z.string(),
  viewer_count: z.number().int(),
  publisher_id: z.string(), // ObjectID as string

  live_stream_status: z.boolean(),

  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const liveStreamsArraySchema = z.array(liveStreamSchema)

export const userSchema = z.object({
  id: z.string().optional(), // ObjectID as string for JSON serialization
  username: z.string(),
  email: z.string().email(),
  password: z.string(),

  following: z.array(z.string()), // Array of ObjectIDs as strings

  created_at: z.date(),
  updated_at: z.date(),
});