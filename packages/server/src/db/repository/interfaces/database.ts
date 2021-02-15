import SparkRepository from './spark';
import MemberRepository from './member';
import SparkmapRepository from './sparkmap';
import MemberProfileRepository from './memberprofile';
import IgniteRepository from './ignite'
import RegistrationRepository from './registration';
import ResetPasswordRepository from './resetPassword';
import SearchRepository from './search';

export default interface DatabaseRepository {
    context: any;
    sparkmap: SparkmapRepository;
    member: MemberRepository;
    spark: SparkRepository;
    memberprofile: MemberProfileRepository;
    ignite: IgniteRepository;
    registration: RegistrationRepository;
    resetPassword: ResetPasswordRepository;
    search: SearchRepository;
}