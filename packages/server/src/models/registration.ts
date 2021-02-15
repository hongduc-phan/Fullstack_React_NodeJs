export interface EmailVerificationCode {
    id: string;
    code: string;
    email: string;
    verified: boolean;
    createdDatetime: Date;
    updatedDatetime: Date;
}

export interface NameCheckResult {
    membernameExists: boolean;
    emailExists: boolean;
}