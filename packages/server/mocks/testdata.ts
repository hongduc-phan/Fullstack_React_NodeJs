import bcrypt from 'bcryptjs';
import {
	MemberProfileUpdateInput,
	MemberPublicProfile,
	ProfileActivity
} from '../src/generated/graphql';
import { IgniteGroup, IgniteUsageCount } from '../src/models/ignite';
import { CreatedMember, Invitation, MemberFull, MemberShort } from '../src/models/member';
import { Spark, SparkIgnite } from '../src/models/spark';
import { Sparkmap } from '../src/models/sparkmap';
import { SparkStat } from '../src/models/sparkstat';
import { SearchResult, SparkMapSummary } from '../src/models/search';

export const TEST_MEMBER_ID = 'test member id';
export const TEST_RAW_PASSWORD = 'test raw password';
export const TEST_EMAIL = 'test@email.com';
export const TEST_NOT_EXISTED_EMAIL = 'test_not_existed@email.com';
export const TEST_INVITATION_ID = 'test invitation id 44354545';
export const TEST_RESET_PASSWORD_ID = '123-6788-ffff-3323232-cocormr-545s';
export const TEST_NOT_EXISTED_RESET_ID = 'not existed reset id';
export const TEST_VERIFICATION_CODE = '123456';

export const testCreatedMember: CreatedMember = {
	id: TEST_MEMBER_ID,
	invitationId: TEST_INVITATION_ID,
	email: TEST_EMAIL,
	password: TEST_RAW_PASSWORD,
	membername: 'string',
	firstname: 'Jhon',
	lastname: 'Doe'
};

export const testMemberFullMock: MemberFull = {
	id: TEST_MEMBER_ID,
	firstname: 'Test',
	lastname: 'Testino',
	email: TEST_EMAIL,
	interests: [],
	birthdate: new Date(),
	website: 'string',
	background: [],
	aboutme: 'string',
	membername: 'string',
	profilePictureUrl: 'string',
	coverImageUrl: 'string',
	languages: [],
	places: [],
	knowtypes: [],
	isFirstLogin: false
};

export const testMemberShortMock: MemberShort = {
	id: TEST_MEMBER_ID,
	password: bcrypt.hashSync(TEST_RAW_PASSWORD, bcrypt.genSaltSync(10)),
	email: TEST_EMAIL,
	membername: 'member1'
};

export const testMemberProfileUpdateInput: MemberProfileUpdateInput = {
	birthdate: 'string',
	website: 'string',
	aboutme: 'string',
	profilePictureUrl: 'string',
	coverImageUrl: 'string',
	languages: [],
	places: [],
	background: [],
	interests: [],
	knowtypes: []
};

export const TEST_SPARKMAP_ID = '123-456';
export const TEST_SPARK_ID = '444-333';
export const TEST_PARENT_ID = `86852323`;

export const testSpark: Spark = {
	id: TEST_SPARK_ID,
	title: 'test title',
	body: 'test body',
	description: 'test description',
	isDraft: false,
	backgroundImage: 'http://node1.cdn-provider1.com/images_store/12345/67890_image1.jpg',
	memberId: TEST_MEMBER_ID,
	sparkmapId: TEST_SPARKMAP_ID,
	parentSparkId: TEST_PARENT_ID,
	createdDatetime: new Date(),
	updatedDatetime: new Date()
};

export const testParentSpark: Spark = {
	id: TEST_PARENT_ID,
	title: 'parent test title',
	body: 'parent test body',
	description: 'parent test description',
	isDraft: false,
	backgroundImage: 'http://node1.cdn-provider1.com/images_store/12345/67890_image1.jpg',
	memberId: TEST_MEMBER_ID,
	sparkmapId: TEST_SPARKMAP_ID,
	parentSparkId: null,
	createdDatetime: new Date(),
	updatedDatetime: new Date()
};

export const testSparkmap: Sparkmap = {
	id: TEST_SPARKMAP_ID
};

export const testImagesList = ['image1.jpg', 'image2.jpg'];
export const IMAGES_RELATIVE_PATH = '/images_store';
export const IMAGES_CDN_ENDPOINT = 'test-endpoint';

export const testSparkStat: SparkStat[] = [
	{ spark: testSpark, count: 4 },
	{ spark: testSpark, count: 7 }
];

export const testMemberProfile: MemberPublicProfile = {
	id: testMemberFullMock.id,
	membername: testMemberFullMock.membername,
	firstname: testMemberFullMock.firstname,
	lastname: testMemberFullMock.lastname,
	profilePictureUrl: testMemberFullMock.profilePictureUrl,
	aboutme: testMemberFullMock.aboutme,
	profileActivity: {} as ProfileActivity
};

export const sparkIgnitesMock: SparkIgnite[] = [
	{
		memberId: TEST_MEMBER_ID,
		igniteId: 'ingnite1'
	},
	{
		memberId: TEST_MEMBER_ID,
		igniteId: 'ingnite2'
	}
];

export const testIgniteGroup = {} as IgniteGroup;

export const testInvitation: Invitation = {
	invitationId: TEST_INVITATION_ID,
	memberId: TEST_MEMBER_ID,
	createdDatetime: new Date()
};

export const testIgniteUsage: IgniteUsageCount = { igniteId: '123', usageCount: 4 };

export const testSparkmapSummary: SparkMapSummary = {
	sparkmapId: TEST_SPARKMAP_ID,
	sparksCount: 5,
	ignitesCount: 34,
	participantsCount: 4,
	topParticipants: [testMemberFullMock, testMemberFullMock],
	topIgnites: ['human', 'art'],
	initialSparkTitle: 'human in art',
	initialSparkImgUrl: 'test url',
	initiatedBy: testMemberFullMock,
	initiatedDate: new Date('2020-01-01')
}

export const searchResultTestData: SearchResult = {
	mainOrbit: { sparks: [testSpark, testSpark] },
	otherResults: [testSparkmapSummary,testSparkmapSummary]
};
