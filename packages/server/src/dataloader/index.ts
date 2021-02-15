import MemberDataLoader from './memberDataLoader';

export default class DataLoader {
    memberDataLoader: MemberDataLoader;

    constructor(memberDataLoader: MemberDataLoader) {
        this.memberDataLoader = memberDataLoader
    }
}