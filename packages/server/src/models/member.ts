import Maybe from 'src/types/maybe';

export interface MemberShort {
	id: string;
	email: string;
	membername: string;
	password: string;
}

export interface CreateMemberInput {
	firstname: string;
	lastname: string;
	membername: string;
	email: string;
	password: string;
	birthdate: Date;
}

export interface CreatedMember {
	id: string;
	firstname: string;
	lastname: string;
	membername: string;
	email: string;
	password: string;
	invitationId: string;
}

export interface MemberFull {
	id: string;
	membername: string;
	email: string;
	firstname: Maybe<string>;
	lastname: Maybe<string>;
	birthdate: Maybe<Date>;
	profilePictureUrl: Maybe<string>;
	coverImageUrl: Maybe<string>;
	aboutme: Maybe<string>;
	languages: Maybe<string[]>;
	places: Maybe<string[]>;
	website: Maybe<string>;
	background: Maybe<string[]>;
	interests: Maybe<string[]>;
	knowtypes: Maybe<string[]>;
	isFirstLogin: boolean;
}

export interface MemberProfileUpdate {
	id: string;
	firstname: Maybe<string>;
	lastname: Maybe<string>;
	birthdate: Maybe<Date>;
	profilePictureUrl: Maybe<string>;
	coverImageUrl: Maybe<string>;
	aboutme: Maybe<string>;
	languages: Maybe<string[]>;
	places: Maybe<string[]>;
	website: Maybe<string>;
	background: Maybe<string[]>;
	interests: Maybe<string[]>;
	knowtypes: Maybe<string[]>;
	isFirstLogin: Maybe<boolean>;
}

export interface Invitation {
	invitationId: string;
	memberId: string;
	createdDatetime: Date;
}
