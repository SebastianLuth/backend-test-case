import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { BorrowBookRequest, BorrowBookResponse, getTheNumberOfBorrowedBookRequest, getTheNumberOfBorrowedBookResponse } from "../model/book-model";
import { CreateMemberRequest, CreateMemberResponse, ReturnBookRequest, ReturnBookResponse } from "../model/member-model";
import { MemberValidation } from "../validation/member-validation";
import { Validation } from "../validation/validation";
import { date } from "zod";

export class MemberService {
    static async createMember (request : CreateMemberRequest) : Promise<CreateMemberResponse> {
        const createMemberRequest = Validation.validate(MemberValidation.CreateMember, request); 

        const totalMemberWithSameCode = await prismaClient.member.count({
            where : {
                code : createMemberRequest.code
            }
        })

        if (totalMemberWithSameCode != 0) {
            throw new ResponseError(400,"Member with same code already exists")
        }

        const member = await prismaClient.member.create({
            data : createMemberRequest
        })

        return member
    }

    static async getAllMember () : Promise<CreateMemberResponse[]> {
        const member = await prismaClient.member.findMany();
        return member
    }

    static async borrowBookByMember (request : BorrowBookRequest) : Promise<BorrowBookResponse> {
        const borrowBookRequest = Validation.validate(MemberValidation.BorrowBook, request);

        //Check penalized member
        const member = await prismaClient.member.findUnique({
            where : {
                code : borrowBookRequest.memberCode
            }
        })

        if(!member) {
            throw new ResponseError(404, "Member not found");
        }

        if(member.isPenalized) {
            throw new ResponseError(400, "Member is penalized");
        }

        // Checking active boorrow
        const activeBorrow = await prismaClient.borrowRecord.count({
            where : {
                memberCode : borrowBookRequest.memberCode,
                returnedAt : null
            }
        })

        if (activeBorrow + borrowBookRequest.bookCodes.length > 2) {
            throw new ResponseError(400, "Member can borrow a maximum of 2 books at a time");
        }

        // const unavailableBooks
        const unavailableBooks = await prismaClient.borrowRecord.findMany({
            where : {
                bookCode : {
                    in : borrowBookRequest.bookCodes
                },
                returnedAt : null
            }
        })

        if(unavailableBooks.length > 0) {
            throw new ResponseError(400, "Book is unavailable cause it is borrowed by another member");
        }

        // create borrow record
        const borrowRecords = await prismaClient.borrowRecord.createMany({
            data : borrowBookRequest.bookCodes.map(bookCode => ({
                memberCode : borrowBookRequest.memberCode,
                bookCode : bookCode,
                borrowedAt : new Date()
            }))
        })

        // get detail book
        const borrowedBooks = await prismaClient.books.findMany({
            where : {
                code : {
                    in : borrowBookRequest.bookCodes
                }
            },
            select : {
                code : true,
                title : true,
                author : true,
            }
        })

        return {
            memberCode : borrowBookRequest.memberCode,
            borrowedBooks : borrowedBooks.map(book => ({
                code : book.code,
                title : book.title,
                author : book.author,
                dueDate : new Date(new Date().setDate(new Date().getDate() + 7))
            }))
        }

    }   
    
    static async getBooksBorrowedByMember(memberCode : string) : Promise<getTheNumberOfBorrowedBookResponse> {

        const borrowRecords  = await prismaClient.borrowRecord.findMany({
            where : {
                memberCode : memberCode,
                returnedAt : null,
            },
        })

        return {
            memberCode,
            borrowedCount: borrowRecords.length
          };    
        
    }

    static async returnBookByMember(request: ReturnBookRequest): Promise<ReturnBookResponse> {
        const validatedRequest = Validation.validate(MemberValidation.ReturnBook, request);
        const { memberCode, bookCodes, returnDate } = validatedRequest;
    
        // Checking if the books are borrowed by the member
        const borrowRecord = await prismaClient.borrowRecord.findFirst({
            where: {
                memberCode: memberCode,
                bookCode: {
                    in: bookCodes
                },
                returnedAt: null
            }, 
            select: {
                id : true,
                memberCode : true,
                bookCode : true,
                borrowedAt : true,
            }
        });
    
        if (!borrowRecord) {
            throw new ResponseError(400, "Book is not borrowed by the member");
        }
    
        // Checking due date and applying penalty if late
        let isPenalized = false;
        const borrowDate = new Date(borrowRecord.borrowedAt);
        const dueDate = new Date(borrowDate);
        dueDate.setDate(borrowDate.getDate() + 7);
    
        let penaltyEndDate: Date | null = null; 
        if (returnDate > dueDate) {
            isPenalized = true;
            penaltyEndDate = new Date(returnDate);
            penaltyEndDate.setDate(penaltyEndDate.getDate() + 3);
    
            await prismaClient.member.update({
                where: { code: memberCode },
                data: { isPenalized: true }
            });
        }
    
        // Updating borrow record
        const updatedBorrowRecord = await prismaClient.borrowRecord.update({
            where: { id: borrowRecord.id }, 
            data: { returnedAt: returnDate }
        });
    
        if (!updatedBorrowRecord) {
            throw new ResponseError(400, "Failed to return book");
        }
    
        return {
            memberCode,
            bookCodes,
            returnDate,
            dueDate,
            penalty: isPenalized,
            penaltyEndDate 
        };
    }
    
}