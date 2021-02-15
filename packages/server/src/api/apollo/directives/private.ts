import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql'
import { ensureSignedIn } from '../../../auth'


class PrivateDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: any){
        const {resolve = defaultFieldResolver} = field
        field.resolve = function (...args: [any, any, any]) {
            const [,,context] = args

            ensureSignedIn(context)

            return resolve.apply(this, args)
        }
    }
}

export default PrivateDirective