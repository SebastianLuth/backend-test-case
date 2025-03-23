import {Request, Response, NextFunction} from "express";
import { CreateMemberRequest, ReturnBookRequest } from "../model/member-model";
import { MemberService } from "../service/member-service";
import { BorrowBookRequest } from "../model/book-model";

export class MemberController {
    static async createMember (req : Request, res : Response, next: NextFunction) {
        try {
            const request : CreateMemberRequest = req.body as CreateMemberRequest;
            const response = await MemberService.createMember(request);

            res.status(200).json({
                data : response
            });
        } catch (e) {
            next(e);
        }
    }

    static async getAllMember (req : Request, res : Response, next: NextFunction) {
        try {
            const response = await MemberService.getAllMember();
            res.status(200).json({
                data : response
            })
        } catch (error) {
            next(error);
        }
    }

    static async borrowBookByMember (req : Request, res : Response, next: NextFunction) {
        try {
            const request : BorrowBookRequest = req.body as BorrowBookRequest;
            const response = await MemberService.borrowBookByMember(request);

            res.status(200).json({
                data : response
            });
        } catch (error) {
            next(error);
        }
    }


    static async getTheNumberOfBorrowedBook (req : Request, res : Response, next: NextFunction) {
        try {
            const memberCode = req.query.memberCode as string;
            const response = await MemberService.getBooksBorrowedByMember(memberCode);
            res.status(200).json({
                data : response
            });
        } catch (error) {
            next(error);
        }
    }


    static async returnBookByMember (req : Request, res : Response, next: NextFunction) {
        try {
            const request : ReturnBookRequest = req.body as ReturnBookRequest;
            const response = await MemberService.returnBookByMember(request);
            res.status(200).json({
                data : response
            });
        } catch (error) {
            next(error);
        }
    }

}