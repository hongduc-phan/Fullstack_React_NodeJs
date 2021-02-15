import ApolloContext from '../src/types/apollocontext';
import JWTPayload from '../src/types/jwtpayload';
import {
	TEST_MEMBER_ID,
	testMemberFullMock,
	testMemberShortMock,
	testSpark,
	testParentSpark,
	testSparkmap,
	testImagesList,
	sparkIgnitesMock,
	TEST_EMAIL,
	testIgniteGroup,
	testSparkStat,
	testInvitation,
	testCreatedMember,
	TEST_RESET_PASSWORD_ID,
	TEST_VERIFICATION_CODE,
	TEST_NOT_EXISTED_EMAIL,
	TEST_NOT_EXISTED_RESET_ID,
	testMemberProfile,
	testIgniteUsage,
	searchResultTestData
} from './testdata';
import MemberRepository from '../src/db/repository/interfaces/member';
import DatabaseRepository from '../src/db/repository/interfaces/database';
import Services from '../src/services/interfaces/services';
import e from 'express';
import SparkRepository from '../src/db/repository/interfaces/spark';
import SparkmapRepository from '../src/db/repository/interfaces/sparkmap';
import ImageStoreService from '../src/services/interfaces/imagestore';
import MemberProfileRepository from '../src/db/repository/interfaces/memberprofile';
import DataLoader from '../src/dataloader';
import MemberDataLoader from '../src/dataloader/memberDataLoader';
import Dictionary from '../src/types/dictionary';
import { MemberFull } from '../src/models/member';
import IgnitesService from '../src/services/interfaces/ignites';
import ResetPasswordRepository from '../src/db/repository/interfaces/resetPassword';
import EmailSender from '../src/services/interfaces/emailsender';
import IgniteRepository from '../src/db/repository/interfaces/ignite';
import SearchRepository from '../src/db/repository/interfaces/search';

export const getMemberByIdMock = jest.fn((x) => Promise.resolve(testMemberFullMock));
export const getMemberByEmailMock = jest.fn((x) => {
	if (x === TEST_NOT_EXISTED_EMAIL) return Promise.resolve(null);

	return Promise.resolve(testMemberShortMock);
});
export const createMemberMock = jest.fn((x) => Promise.resolve(testCreatedMember));
export const getAllMock = jest.fn(() =>
	Promise.resolve([testMemberFullMock, testMemberFullMock, testMemberFullMock])
);
export const updateMemberMock = jest.fn((x) => Promise.resolve(testMemberFullMock));
export const changePasswordMock = jest.fn((x) => Promise.resolve(true));
export const changeEmailMock = jest.fn((x, y) => Promise.resolve(true));
export const getInvitationMock = jest.fn((x) => Promise.resolve(testInvitation));

export const getSparkByIdMock = jest.fn((x) => Promise.resolve(testSpark));
export const getSparkAllMock = jest.fn((x) => Promise.resolve([testSpark, testSpark]));
export const createSparkMock = jest.fn((x) => Promise.resolve(testSpark));
export const createSparkOnMock = jest.fn((x) => Promise.resolve(testSpark));
export const deleteSparkMock = jest.fn((x) => Promise.resolve(testSpark));
export const getSparkChildrenByParentIdMock = jest.fn((x) =>
	Promise.resolve([testSpark, testSpark])
);
export const getSparkParentByChildIdMock = jest.fn((x) => Promise.resolve(testParentSpark));
export const updateSparkMock = jest.fn((x) => Promise.resolve(testSpark));
export const publishSparkMock = jest.fn((x) => Promise.resolve(testSpark));
export const getSparkIgnitesMock = jest.fn((x) => Promise.resolve(sparkIgnitesMock));
export const assignIgnitesMock = jest.fn((x, x1, x3) => Promise.resolve(sparkIgnitesMock));
export const getBestFitSparksMock = jest.fn((x) => Promise.resolve([testSpark, testSpark]));
export const getBestFitForProfileMock = jest.fn((x) => Promise.resolve([testSpark, testSpark]));
export const topParticipantsForSparkMock = jest.fn((x) =>
	Promise.resolve([testMemberFullMock, testMemberFullMock])
);

export const getSparkmapByIdMock = jest.fn((x) => Promise.resolve(testSparkmap));
export const getSparkmapAllMock = jest.fn((x) => Promise.resolve([testSparkmap]));
export const createEmptySparkmapMock = jest.fn((x) => Promise.resolve(testSparkmap));
export const getSparkmapBySparkIdMock = jest.fn((x) => Promise.resolve(testSparkmap));

export const storeImageMock = jest.fn((x) => Promise.resolve('http://test.cdn.com/image_1234.jpg'));
export const getImagesMock = jest.fn((x) => Promise.resolve(testImagesList));
export const getImagesNullMock = jest.fn((x) => Promise.resolve(null));

export const getReceivedSparksCountMock = jest.fn((x) => Promise.resolve(testSparkStat));
export const getDonatedSparksCountMock = jest.fn((x) => Promise.resolve(testSparkStat));
export const getReceivedIgnitesSparksCountMock = jest.fn((x) => Promise.resolve(testSparkStat));
export const getDonatedIgnitesSparksCountMock = jest.fn((x) => Promise.resolve(testSparkStat));

export const getGroupByIgniteMock = jest.fn((x) => 'group111');
export const getGroupsMock = jest.fn(() => [testIgniteGroup]);

export const saveResetPasswordIDMock = jest.fn((x) => Promise.resolve(TEST_RESET_PASSWORD_ID));
export const getMemberByResetIDMock = jest.fn((resetId) => {
	if (resetId === TEST_NOT_EXISTED_RESET_ID) return Promise.resolve(null);

	return Promise.resolve(testMemberShortMock);
});
export const setNewPasswordMock = jest.fn((resetId, memberId, password) => Promise.resolve(true));

export const sendVerificationCodeMock = jest.fn((x) => Promise.resolve(TEST_VERIFICATION_CODE));
export const sendResetPasswordLinkMock = jest.fn((x, y) => Promise.resolve(true));
export const sendRegistrationFinisgedEmailMock = jest.fn((x) => Promise.resolve(true));

export const getIgniteUsageCountsMock = jest.fn(() =>
	Promise.resolve([testIgniteUsage, testIgniteUsage])
);
export const getTopIgnitesForSparkMock = jest.fn((x) =>
	Promise.resolve([testIgniteUsage, testIgniteUsage])
);

export const searchMock = jest.fn((x) => Promise.resolve(searchResultTestData));

export const contextMock: ApolloContext = {
	member: {
		id: TEST_MEMBER_ID,
		membername: 'test_member',
		email: TEST_EMAIL
	} as JWTPayload,
	db: {
		member: {
			getById: getMemberByIdMock,
			getAll: getAllMock,
			getByEmail: getMemberByEmailMock,
			create: createMemberMock,
			update: updateMemberMock,
			changePassword: changePasswordMock,
			changeEmail: changeEmailMock,
			getInvitation: getInvitationMock
		} as MemberRepository,
		memberprofile: {
			getReceivedSparksCount: getReceivedSparksCountMock,
			getDonatedSparksCount: getDonatedSparksCountMock,
			getReceivedIgnitesSparksCount: getReceivedIgnitesSparksCountMock,
			getDonatedIgnitesSparksCount: getDonatedIgnitesSparksCountMock
		} as MemberProfileRepository,
		spark: {
			getById: getSparkByIdMock,
			getAll: getSparkAllMock,
			createSpark: createSparkMock,
			createSparkOn: createSparkOnMock,
			deleteSpark: deleteSparkMock,
			getChildrenByParentId: getSparkChildrenByParentIdMock,
			getParentByChildId: getSparkParentByChildIdMock,
			updateSpark: updateSparkMock,
			publishSpark: publishSparkMock,
			getSparkIgnites: getSparkIgnitesMock,
			assignIgnites: assignIgnitesMock,
			getBestFitSparks: getBestFitSparksMock,
			topParticipantsForSpark: topParticipantsForSparkMock,
			getBestFitForProfile: getBestFitForProfileMock
		} as SparkRepository,
		sparkmap: {
			getById: getSparkmapByIdMock,
			getAll: getSparkmapAllMock,
			createEmptySparkmap: createEmptySparkmapMock,
			getSparkmapBySparkId: getSparkmapBySparkIdMock
		} as SparkmapRepository,
		resetPassword: {
			saveResetPasswordID: saveResetPasswordIDMock,
			getMemberByResetID: getMemberByResetIDMock,
			setNewPassword: setNewPasswordMock
		} as ResetPasswordRepository,
		ignite: {
			getIgniteUsageCounts: getIgniteUsageCountsMock,
			getTopIgnitesForSpark: getTopIgnitesForSparkMock
		} as IgniteRepository,
		search: {
			search: searchMock
		} as SearchRepository
	} as DatabaseRepository,
	services: {
		imageStore: {
			storeImage: storeImageMock,
			getImages: getImagesMock
		} as ImageStoreService,
		ignites: {
			getGroupByIgnite: getGroupByIgniteMock,
			getGroups: getGroupsMock
		} as IgnitesService,
		emailSender: {
			sendVerificationCode: sendVerificationCodeMock,
			sendResetPasswordLink: sendResetPasswordLinkMock,
			sendRegistrationFinisgedEmail: sendRegistrationFinisgedEmailMock
		} as EmailSender
	} as Services,
	req: { protocol: 'protocol', get: (p: any) => 'testhost:555' } as e.Request,
	res: {} as e.Response,
	dataloader: {
		memberDataLoader: ({
			getById: getMemberByIdMock
		} as unknown) as MemberDataLoader
	} as DataLoader
};
