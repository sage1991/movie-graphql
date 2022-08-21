import { ApolloServer } from "apollo-server"

import { schema } from "./graphql"

const server = new ApolloServer({ schema })
void server.listen().then(({ url }) => console.log(`Graphql server now running on ${url}`))
