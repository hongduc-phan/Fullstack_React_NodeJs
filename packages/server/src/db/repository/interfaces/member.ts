import {
    MemberFull,
    MemberProfileUpdate,
    MemberShort,
    CreatedMember,
    CreateMemberInput,
    Invitation } from '../../../models/member';

export default interface MemberRepository {
    getById: (memberId: string) => Promise<MemberFull | null>;
    getAll: () => Promise<MemberFull[]>
    getByEmail: (email: string) => Promise<MemberShort | null>;
    create: (member: CreateMemberInput) => Promise<CreatedMember>;
    update: (member: MemberProfileUpdate) => Promise<MemberFull | null>;
    changePassword: (memberId: string, newPassword: string) => Promise<boolean>;
    changeEmail:  (memberId: string, newEmail: string) => Promise<boolean>;
    getInvitation: (memberId: string) => Promise<Invitation | null>;
}