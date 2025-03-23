import { z, ZodType } from "zod";

export class BookValidation {
    static readonly CreateBook: ZodType = z.object({
        code : z.string().min(1),
        title : z.string().min(1),
        author : z.string().min(1),
        stock : z.number()
    })

    static readonly GetAllBookAndAvailableStock: ZodType = z.object({
        code : z.string().min(1),
        title : z.string().min(1),
        author : z.string().min(1),
        stock : z.number()
    })
}   