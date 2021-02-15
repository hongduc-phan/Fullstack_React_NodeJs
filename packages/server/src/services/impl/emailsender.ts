import sendgridMail from '@sendgrid/mail';
import EmailSender from '../interfaces/emailsender';
import config from '../../configs';
import { emailVerification, resetPassword, regFinished, regFinishedText } from './templates';
import { CreatedMember } from 'src/models/member';

sendgridMail.setApiKey(config.SENDGRID_API_KEY || '');

async function sendVerificationCode(email: string): Promise<string> {
	const code = Math.floor(100000 + Math.random() * 900000).toString();

	const mailOptions = {
		from: config.SENDGRID_FROM_EMAIL || '',
		to: email,
		subject: 'Email verification code',
		text: `Email verification code: ${code}`,
		html: emailVerification({ code })
	};

	const res = await sendgridMail.send(mailOptions);

	return code;
}

async function sendResetPasswordLink(email: string, resetId: string): Promise<boolean> {
	const resetPasswordLink = `${config.RESET_PASSWORD_HOST}/resetPassword/setNewPassword/${resetId}`;

	const mailOptions = {
		from: config.SENDGRID_FROM_EMAIL || '',
		to: email,
		subject: 'Reset password',
		text: `Reset password link: ${resetPasswordLink}`,
		html: resetPassword({ resetPasswordLink })
	};

	const res = await sendgridMail.send(mailOptions);

	return true;
}

async function sendRegistrationFinisgedEmail(member: CreatedMember): Promise<boolean> {
	const mailOptions = {
		from: config.SENDGRID_FROM_EMAIL || '',
		to: member.email,
		subject: 'Thank you for registering your interest.',
		text: regFinishedText(member),
		html: regFinished(member)
	};

	const res = await sendgridMail.send(mailOptions);

	return true;
}

export default {
	sendVerificationCode,
	sendResetPasswordLink,
	sendRegistrationFinisgedEmail
} as EmailSender;
