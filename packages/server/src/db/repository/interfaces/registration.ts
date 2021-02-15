import { EmailVerificationCode, NameCheckResult } from 'src/models/registration';

export default interface RegistrationRepository {
    saveEmailVerificationCode: (code:string, email:string) => Promise<EmailVerificationCode>;
    verifyCode: (code:string, email:string) => Promise<boolean>;
    checkMembername: (membername: string, email: string) => Promise<NameCheckResult>;
}