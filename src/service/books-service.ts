import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateBookRequest, CreateBookResponse, GetAllBookAndAvailableStockResponse } from "../model/book-model";
import { BookValidation } from "../validation/book-validation";
import { Validation } from "../validation/validation";

export class BookService {
    static async createBook (request : CreateBookRequest) : Promise<CreateBookResponse> {
        const createBookRequest = Validation.validate(BookValidation.CreateBook, request);

        const totalBookWithSameCode = await prismaClient.books.count({
            where : {
                code : createBookRequest.code
            }
        })

        if (totalBookWithSameCode != 0) {   
            throw new ResponseError(400,"Book with same code already exists")
        }

        const book = await prismaClient.books.create({
            data : createBookRequest
        })

        return book
    }

    static async getAllBookAndAvailableStock () : Promise<GetAllBookAndAvailableStockResponse[]> {
        const books = await prismaClient.books.findMany({
            select : {
                code : true,
                title : true,
                author : true,
                stock : true,
                borrowRecords : {
                    where : {
                        returnedAt : null
                    },
                    select : {
                        id : true
                    }
                }
            }
        })

        if (books.length == 0) {
            return []
        }

        const result = books.map(book => ({
            code : book.code,
            title : book.title,
            author : book.author,
            stock : book.stock - book.borrowRecords.length
        }))

        return result

    }
}