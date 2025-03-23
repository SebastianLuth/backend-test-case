import express from "express";
import { MemberController } from "../controllers/member-controllers";
import { BookController } from "../controllers/book-controller";

export const router = express.Router();


// Member
router.post("/api/member", MemberController.createMember );
router.get("/api/member", MemberController.getAllMember );
router.post("/api/member/borrow", MemberController.borrowBookByMember);
router.get("/api/member/borrow", MemberController.getTheNumberOfBorrowedBook);
router.post("/api/member/return", MemberController.returnBookByMember);

// Code 
router.get("/api/book", BookController.getAllBookAndAvailableStock);
router.post("/api/book", BookController.createBook);
