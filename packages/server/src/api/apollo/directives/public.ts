import { SchemaDirectiveVisitor } from 'apollo-server-express'
import {ensureSignedOut} from '../../../auth'
import { defaultFieldResolver } from 'graphql'

class PublicDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: any){
        const {resolve = defaultFieldResolver} = field
        field.resolve = function (...args: [any, any, any]) {
            const [,,context] = args

            ensureSignedOut(context)

            return resolve.apply(this, args)
        }
    }
}
export default PublicDirective