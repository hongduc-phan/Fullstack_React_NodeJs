export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
  Date: any;
  DateTime: any;
};




export type Query = {
  __typename?: 'Query';
  sparkmap?: Maybe<Sparkmap>;
  draftsparkmap?: Maybe<Sparkmap>;
  sparkmaps?: Maybe<Array<Sparkmap>>;
  spark?: Maybe<Spark>;
  sparks?: Maybe<Array<Spark>>;
  currentMember?: Maybe<Member>;
  images?: Maybe<Array<Maybe<Image>>>;
  privateProfile: MemberPrivateProfile;
  publicProfile: MemberPublicProfile;
  ignites?: Maybe<Array<IgniteGroup>>;
  getInvitation?: Maybe<Invitation>;
  getBestFitSparks: BestFitSparksResult;
  getBestFitForProfile: BestFitSparksResult;
  search: SearchResult;
};


export type QuerySparkmapArgs = {
  id: Scalars['ID'];
};


export type QueryDraftsparkmapArgs = {
  id: Scalars['ID'];
};


export type QuerySparkArgs = {
  id: Scalars['ID'];
};


export type QuerySparksArgs = {
  sparkmapId?: Maybe<Scalars['ID']>;
};


export type QueryPublicProfileArgs = {
  memberId: Scalars['ID'];
};


export type QueryGetBestFitSparksArgs = {
  sparkId: Scalars['ID'];
};


export type QuerySearchArgs = {
  query: SearchQueryInput;
};

export type Mutation = {
  __typename?: 'Mutation';
  createSpark: Spark;
  createSparkon: Spark;
  deleteSpark?: Maybe<Spark>;
  updateSpark?: Maybe<Spark>;
  publish?: Maybe<Spark>;
  register?: Maybe<Auth>;
  login?: Maybe<Auth>;
  logout?: Maybe<Scalars['Boolean']>;
  changePassword?: Maybe<Scalars['Boolean']>;
  changeEmail?: Maybe<ChangeEmailResult>;
  singleUpload: Image;
  updateMemberProfile: MemberPrivateProfile;
  assignIgnites?: Maybe<Array<SparkIgnite>>;
  createEmailVerificationCode?: Maybe<Scalars['Boolean']>;
  verifyCode?: Maybe<Scalars['Boolean']>;
  resetPassword?: Maybe<Scalars['Boolean']>;
  checkResetID?: Maybe<Scalars['Boolean']>;
  setNewPassword?: Maybe<Scalars['Boolean']>;
  checkMembername: NameCheckResult;
};


export type MutationCreateSparkArgs = {
  input: CreateSparkInput;
};


export type MutationCreateSparkonArgs = {
  input: CreateSparkOnInput;
};


export type MutationDeleteSparkArgs = {
  sparkId: Scalars['ID'];
};


export type MutationUpdateSparkArgs = {
  spark: SparkUpdateInput;
};


export type MutationPublishArgs = {
  sparkId: Scalars['ID'];
};


export type MutationRegisterArgs = {
  input: RegisterMemberInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationChangeEmailArgs = {
  newEmail: Scalars['String'];
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationUpdateMemberProfileArgs = {
  profile: MemberProfileUpdateInput;
};


export type MutationAssignIgnitesArgs = {
  input: AssignIgnitesInput;
};


export type MutationCreateEmailVerificationCodeArgs = {
  email: Scalars['String'];
};


export type MutationVerifyCodeArgs = {
  code: Scalars['String'];
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationCheckResetIdArgs = {
  resetId: Scalars['String'];
};


export type MutationSetNewPasswordArgs = {
  resetId: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCheckMembernameArgs = {
  membername: Scalars['String'];
  email: Scalars['String'];
};

export type SearchQueryInput = {
  keywords: Array<Scalars['String']>;
  igniteIds: Array<Scalars['String']>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  mainOrbit: Orbit;
  otherResults?: Maybe<Array<SparkMapSummary>>;
};

export type SparkMapSummary = {
  __typename?: 'SparkMapSummary';
  sparkmapId: Scalars['String'];
  sparksCount: Scalars['Int'];
  ignitesCount: Scalars['Int'];
  participantsCount: Scalars['Int'];
  topParticipants?: Maybe<Array<MemberPublicProfile>>;
  topIgnites?: Maybe<Array<Scalars['String']>>;
  initialSparkTitle: Scalars['String'];
  initialSparkImgUrl: Scalars['String'];
  initiatedBy: MemberPublicProfile;
  initiatedDate: Scalars['Date'];
};

export type Orbit = {
  __typename?: 'Orbit';
  sparks: Array<Spark>;
};

export type BestFitSparksResult = {
  __typename?: 'BestFitSparksResult';
  sparks?: Maybe<Array<Spark>>;
};

export type NameCheckResult = {
  __typename?: 'NameCheckResult';
  membernameExists: Scalars['Boolean'];
  emailExists: Scalars['Boolean'];
};

export type RegisterMemberInput = {
  membername: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  birthdate: Scalars['Date'];
};

export type AssignIgnitesInput = {
  sparkId: Scalars['String'];
  ignitesIds: Array<Scalars['String']>;
};

export type CreateSparkInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  body: Scalars['String'];
  backgroundImage?: Maybe<Scalars['String']>;
  ignites?: Maybe<Array<Scalars['String']>>;
};

export type CreateSparkOnInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  body: Scalars['String'];
  parentSparkId: Scalars['ID'];
  backgroundImage?: Maybe<Scalars['String']>;
  ignites?: Maybe<Array<Scalars['String']>>;
};

export type ChangeEmailResult = {
  __typename?: 'ChangeEmailResult';
  success: Scalars['Boolean'];
};

export type Sparkmap = {
  __typename?: 'Sparkmap';
  id: Scalars['ID'];
  member: Member;
};

export type Spark = {
  __typename?: 'Spark';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  body: Scalars['String'];
  member: Member;
  memberId: Scalars['String'];
  parent?: Maybe<Spark>;
  parentSparkId: Scalars['String'];
  sparkmap: Sparkmap;
  sparkmapId: Scalars['String'];
  isDraft?: Maybe<Scalars['Boolean']>;
  backgroundImage?: Maybe<Scalars['String']>;
  children?: Maybe<Array<Spark>>;
  ignites?: Maybe<Array<SparkIgnite>>;
  createdDatetime?: Maybe<Scalars['DateTime']>;
  updatedDatetime?: Maybe<Scalars['DateTime']>;
  topParticipants?: Maybe<Array<MemberPublicProfile>>;
  topIgnites?: Maybe<Array<Ignite>>;
};

export type SparkUpdateInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  backgroundImage?: Maybe<Scalars['String']>;
  ignites?: Maybe<Array<Scalars['String']>>;
};

export type Auth = {
  __typename?: 'Auth';
  token: Scalars['String'];
};

export type Member = {
  __typename?: 'Member';
  id: Scalars['ID'];
  email: Scalars['String'];
  membername: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  filename: Scalars['String'];
  url: Scalars['String'];
};

export type MemberPublicProfile = {
  __typename?: 'MemberPublicProfile';
  id: Scalars['ID'];
  membername: Scalars['String'];
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  profilePictureUrl?: Maybe<Scalars['String']>;
  coverImageUrl?: Maybe<Scalars['String']>;
  aboutme?: Maybe<Scalars['String']>;
  profileActivity: ProfileActivity;
};

export type MemberPrivateProfile = {
  __typename?: 'MemberPrivateProfile';
  id: Scalars['ID'];
  membername: Scalars['String'];
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  birthdate?: Maybe<Scalars['Date']>;
  profilePictureUrl?: Maybe<Scalars['String']>;
  coverImageUrl?: Maybe<Scalars['String']>;
  aboutme?: Maybe<Scalars['String']>;
  languages?: Maybe<Array<Scalars['String']>>;
  places?: Maybe<Array<Scalars['String']>>;
  website?: Maybe<Scalars['String']>;
  background?: Maybe<Array<Scalars['String']>>;
  interests?: Maybe<Array<Scalars['String']>>;
  knowtypes?: Maybe<Array<Scalars['String']>>;
  profileActivity: ProfileActivity;
  isFirstLogin: Scalars['Boolean'];
};

export type ProfileActivity = {
  __typename?: 'ProfileActivity';
  receivedSparks: Array<SparkStat>;
  donatedSparks: Array<SparkStat>;
  receivedIgnitesSparks: Array<SparkStat>;
  donatedIgnitesSparks: Array<SparkStat>;
};

export type SparkStat = {
  __typename?: 'SparkStat';
  spark: Spark;
  count: Scalars['Int'];
};

export type MemberProfileUpdateInput = {
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  birthdate?: Maybe<Scalars['Date']>;
  profilePictureUrl?: Maybe<Scalars['String']>;
  coverImageUrl?: Maybe<Scalars['String']>;
  aboutme?: Maybe<Scalars['String']>;
  languages?: Maybe<Array<Scalars['String']>>;
  places?: Maybe<Array<Scalars['String']>>;
  website?: Maybe<Scalars['String']>;
  background?: Maybe<Array<Scalars['String']>>;
  interests?: Maybe<Array<Scalars['String']>>;
  knowtypes?: Maybe<Array<Scalars['String']>>;
  isFirstLogin?: Maybe<Scalars['Boolean']>;
};

export type IgniteGroup = {
  __typename?: 'IgniteGroup';
  id: Scalars['String'];
  children?: Maybe<Array<IgniteGroup>>;
  ignites?: Maybe<Array<Ignite>>;
};

export type Ignite = {
  __typename?: 'Ignite';
  id: Scalars['String'];
  usageCount: Scalars['Int'];
};

export type SparkIgnite = {
  __typename?: 'SparkIgnite';
  igniteId: Scalars['String'];
  igniteGroupId: Scalars['String'];
  memberId: Scalars['ID'];
  member: MemberPublicProfile;
};

export type Invitation = {
  __typename?: 'Invitation';
  memberId: Scalars['String'];
  invitationId: Scalars['String'];
  createdDatetime: Scalars['DateTime'];
};


