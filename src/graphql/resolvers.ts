import { resolve } from "path"
import { printSchema } from "graphql"
import { loadSchemaSync } from "@graphql-tools/load"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import { makeExecutableSchema } from "@graphql-tools/schema"

import { people } from "./__mock__"

const resolvers = {
  Query: {
    people: () => people,
    person: (_: any, args: any) => people.find(({ id }) => args.id === id)
  }
}

const typeDefs = loadSchemaSync(resolve(__dirname, "./**/*.graphql"), {
  loaders: [new GraphQLFileLoader()]
})

console.log("Following graphql schema is loaded...")
console.log(printSchema(typeDefs))

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
