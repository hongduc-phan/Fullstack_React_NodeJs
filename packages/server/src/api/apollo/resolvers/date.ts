import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

const dateResolver = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return Date.parse(value) ? new Date(value) : null
    },
    serialize(value) {
      if (value instanceof Date) {
        return value.toISOString().slice(0, 10)
      }
      return null
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value)
      }
      if (ast.kind === Kind.STRING && Date.parse(ast.value)) {
        return new Date(ast.value)
      }
      return null;
    },
  }),
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'Date custom scalar type',
    parseValue(value) {
      return Date.parse(value) ? new Date(value) : null
    },
    serialize(value) {
      if (value instanceof Date) {
        return value.toISOString()
      }
      return null
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value)
      }
      if (ast.kind === Kind.STRING && Date.parse(ast.value)) {
        return new Date(ast.value)
      }
      return null;
    },
  })
}

export default dateResolver
