export type CreateBookRequest = {
    code: string;
    title: string;
    author: string;
    stock: number;
}


export type CreateBookResponse = {
    code: string;
    title: string;
    author: string;
    stock: number;
}

export type GetAllBookAndAvailableStockRequest = {
    code: string;
    title: string;
    author: string;
    stock: number;
}

export type GetAllBookAndAvailableStockResponse = {
    code: string;
    title: string;
    author: string;
    stock: number;
}

export type BorrowBookRequest = {
    memberCode: string;
    bookCodes: string[];
}

export type BorrowBookResponse = {
    memberCode : string;
    borrowedBooks : {
        code: string;
        title: string;
        author: string;
        dueDate: Date;
    }[];
}

export type getTheNumberOfBorrowedBookResponse = {
    memberCode : string;
    borrowedCount : number
}

export type getTheNumberOfBorrowedBookRequest = {
    memberCode : string;
}


