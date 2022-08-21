import { createServer } from "@graphql-yoga/node"

import { schema } from "./graphql"

const server = createServer({ schema })
void server.start().then(() => console.log("Graphql server now running"))
