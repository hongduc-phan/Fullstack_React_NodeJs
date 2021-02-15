import { CreatedMember } from 'src/models/member';

export default interface EmailSender {
	sendVerificationCode: (email: string) => Promise<string>;
	sendResetPasswordLink: (email: string, resetId: string) => Promise<boolean>;
	sendRegistrationFinisgedEmail: (member: CreatedMember) => Promise<boolean>;
}
