import { resolve } from "path"
import { printSchema } from "graphql"
import { loadSchemaSync } from "@graphql-tools/load"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import { makeExecutableSchema } from "@graphql-tools/schema"

import { Post, User } from "./types"
import { posts, users } from "./__mock__"

const resolvers = {
  Query: {
    users: (): User[] => users,
    user: (_: any, args: Pick<User, "id">): User | undefined =>
      users.find(({ id }) => args.id === id),
    posts: (): Post[] => posts,
    post: (_: any, args: Pick<Post, "id">): Post | undefined =>
      posts.find(({ id }) => id === args.id)
  },
  Mutation: {
    addUser: (_: any, person: Omit<User, "id">): User => {
      const newUser: User = {
        id: `${Date.now()}`,
        ...person
      }
      users.push(newUser)
      return newUser
    },
    removeUser: (_: any, args: Pick<User, "id">): boolean => {
      const index = users.findIndex(({ id }) => id === args.id)
      if (index === -1) {
        return false
      }
      users.splice(index, 1)
      return true
    },
    addPost: (_: any, post: Omit<Post, "id">): Post => {
      const newPost: Post = {
        id: `${Date.now()}`,
        ...post
      }
      posts.push(newPost)
      return newPost
    },
    removePost: (_: any, args: Pick<Post, "id">): boolean => {
      const index = posts.findIndex(({ id }) => args.id)
      if (index === -1) {
        return false
      }
      posts.splice(index, 1)
      return true
    }
  },
  User: {
    fullName: ({ name, username }: User) => {
      return `${name} ${username}`
    }
  },
  Post: {
    author: ({ userId }: Post) => users.find(({ id }) => id === userId)
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
