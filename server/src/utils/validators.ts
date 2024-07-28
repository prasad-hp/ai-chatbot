import zod, { string } from "zod";

export const signupSchema = zod.object({
    firstName:zod.string(),
    lastName:zod.string().optional(),
    email:zod.string().email({ message: "Invalid email address" }),
    password:string().min(6, { message: "Must be 6 or more characters long" })
})
export const loginSchema = zod.object({
    email:zod.string().email({ message: "Invalid email address" }),
    password:string().min(6, { message: "Must be 6 or more characters long" })
})