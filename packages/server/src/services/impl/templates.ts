export const emailVerification = (args: any) =>
	`
        <h1>Hello!</h1>
		<p>It is an automatic message.</p>
		<p>For email verification, enter one-time code ${args.code}</p>
        <h4>Take care :) </h4>
	`;

export const resetPassword = (args: any) =>
	`
        <h1>Hello!</h1>
		<p>It is an automatic message.</p>
		<p>Reset password link: <a href="${args.resetPasswordLink}">${args.resetPasswordLink}</a></p>
        <h4>Thank you.</h4>
    `;

export const regFinished = (args: any) =>
	`
    <p>Dear ${args.firstname},</p>

    <p>Thank you for registering your interest in making sense of how humanity works.
    We invite members based on their interest and the order of registrations.
    Our early product has been released. This is good news as you should be able to join us very soon.</p>

    <p>Stay tuned.</p>

    <p>Kind regards, Hunome Team</p>

    <p>Please add our email [xxxxx] to your whitelisted emails (or what ever the process is)</p>
    `;

export const regFinishedText = (args: any) =>
	`
    Dear ${args.firstname},

    Thank you for registering your interest in making sense of how humanity works.
    We invite members based on their interest and the order of registrations.
    Our early product has been released. This is good news as you should be able to join us very soon.

    Stay tuned.

    Kind regards, Hunome Team

    Please add our email [xxxxx] to your whitelisted emails (or what ever the process is).
    `;
