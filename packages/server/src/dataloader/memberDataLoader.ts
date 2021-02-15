import Dictionary from 'src/types/dictionary';
import { MemberFull } from 'src/models/member';
import member from 'src/api/apollo/resolvers/member';
import MemberRepository from 'src/db/repository/interfaces/member';

export default class MemberDataLoader  {
    private _membersCache: Dictionary<MemberFull> = {};
    private _memberDB: MemberRepository;

    constructor(memberDB: MemberRepository) {
        this._memberDB = memberDB

        this._memberDB.getAll().then(members => {
            for (const m of members) {
                if (this._membersCache[m.id]) continue

                this._membersCache[m.id] = m
            }
        })
    }

    async getById(memberId: string): Promise<MemberFull | null> {
        const m = this._membersCache[memberId]
        if (m) return m

        const dbMember = await this._memberDB.getById(memberId)
        if (!dbMember) return null

        this._membersCache[memberId] = dbMember

        return dbMember
    }
}