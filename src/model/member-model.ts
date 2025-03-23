
export type CreateMemberResponse = {
    name : string, 
    code  : string
}

export type CreateMemberRequest = {
    name : string, 
    code  : string
}

export type getAllMemeberResponse = {
    name : string, 
    code  : string
}


export type ReturnBookRequest = {
    memberCode: string;
    bookCodes: string[]; 
    returnDate: Date;
};

export type ReturnBookResponse = {
    memberCode: string;
    bookCodes: string[];
    returnDate: Date;
    dueDate: Date;
    penalty: boolean;
    penaltyEndDate: Date | null; 
};
