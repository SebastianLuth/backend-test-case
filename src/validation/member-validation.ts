import { z, ZodType } from "zod";

export class MemberValidation {
    static readonly CreateMember: ZodType = z.object({
        code : z.string().min(1),
        name : z.string()
    })

    static readonly BorrowBook : ZodType = z.object({
        memberCode : z.string().min(1),
        bookCodes : z.array(z.string()).min(1)
    })

    static readonly ReturnBook: ZodType = z.object({
        memberCode: z.string().min(1),
        bookCodes : z.array(z.string()).min(1),
        returnDate: z.string().transform((val) => new Date(val)) 

    });
}   