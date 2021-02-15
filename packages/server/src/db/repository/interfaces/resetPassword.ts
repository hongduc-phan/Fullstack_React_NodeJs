import { MemberShort } from '../../../models/member';

export default interface ResetPasswordRepository {
    saveResetPasswordID: (memberId:string) => Promise<string>;
    getMemberByResetID: (resetId:string) => Promise<MemberShort | null>;
    setNewPassword: (resetId:string, memberId:string, password:string) => Promise<boolean>;
}