import {Request, Response, NextFunction} from "express";
import { BorrowBookRequest, CreateBookRequest, GetAllBookAndAvailableStockRequest } from "../model/book-model";
import { BookService } from "../service/books-service";
import { request } from "http";

export class BookController {
    static async createBook (req : Request, res : Response, next: NextFunction) {
        try {
            const request : CreateBookRequest = req.body as CreateBookRequest;
            const response = await BookService.createBook(request);

            res.status(200).json({
                data : response
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAllBookAndAvailableStock (req : Request, res : Response, next: NextFunction) {
        try {
            const response = await BookService.getAllBookAndAvailableStock();
            res.status(200).json({
                data : response
            });
        } catch (error) {
            next(error);
        }
    }

    
}