import { Record as DbRecord } from 'neo4j-driver'
import { Spark } from 'src/models/spark'
import { MemberFull, MemberShort } from 'src/models/member'

export const sparkRecordToSpark = (r: DbRecord): Spark => ({
    id: r.get('id'),
    title: r.get('title'),
    body: r.get('body'),
    description: r.get('description'),
    isDraft: r.get('isDraft'),
    backgroundImage: r.get('backgroundImage'),
    memberId: r.get('memberId'),
    sparkmapId: r.get('sparkmapId'),
    parentSparkId: r.get('parentSparkId'),
    createdDatetime: Date.parse(r.get('createdDatetime'))
                        ? new Date(r.get('createdDatetime'))
                        : new Date(0),
    updatedDatetime: Date.parse(r.get('updatedDatetime'))
                        ? new Date(r.get('updatedDatetime'))
                        : new Date(0)
})

export const resultToMemberShort = (r: DbRecord): MemberShort => ({
    id: r.get('id'),
    membername: r.get('membername'),
    password: r.get('password'),
    email: r.get('email')
})

export const resultToMember = (r: DbRecord): MemberFull => ({
	id: r.get('id'),
	membername: r.get('membername'),
	email: r.get('email'),
	firstname: r.get('firstname'),
	lastname: r.get('lastname'),
	birthdate: Date.parse(r.get('birthdate')) ? new Date(r.get('birthdate')) : null,
	profilePictureUrl: r.get('profilePictureUrl'),
	coverImageUrl: r.get('coverImageUrl'),
	aboutme: r.get('aboutme'),
	languages: r.get('languages'),
	places: r.get('places'),
	website: r.get('website'),
	background: r.get('background'),
	interests: r.get('interests'),
    knowtypes: r.get('knowtypes'),
    isFirstLogin: !!r.get('isFirstLogin')
});