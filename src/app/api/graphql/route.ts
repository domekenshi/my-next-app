// GraphQLサーバーを作る関数
import { createYoga } from "graphql-yoga";
// スキーマ定義（型＆ロジック）
import { createSchema } from "graphql-yoga";
// prisma init で prisma/schema.prisma と .env が生成
// マイグレーションでDBファイル作成；npx prisma migrate dev --name init

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Post {
      id: Int!
      title: String!
      content: String
      createdAt: String!
    }

    type Query {
      posts: [Post!]!
    }

    type Mutation {
      createPost(title: String!, content: String): Post!
    }
  `,
  resolvers: {
    Query: {
      posts: async () => {
        return await prisma.post.findMany({ orderBy: { id: "desc" } });
      },
    },
    Mutation: {
      createPost: async (_: any, args: { title: string; content?: string }) => {
        return await prisma.post.create({
          data: { title: args.title, content: args.content },
        });
      },
    },
  },
});

const yoga = createYoga({
  schema,
  //   // GraphQLサーバーの「設計図」を定義
  //   schema: createSchema({
  //     //   hello クエリが使えるという定義
  //     typeDefs: `type Query {
  //     hello: String!
  //     greet(name: String): String!
  //      }`,
  //     //   呼ばれたときの処理ロジック(レスポンス)
  //     resolvers: {
  //       Query: {
  //         hello: () => "Hello from GraphQL",
  //         greet: () => "Hello from greet",
  //       },
  //     },
  //   }),
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Request, Response }, // これがないと Next.js の route.ts の中で動かせない
});
// Next.js App Router の route.ts では GET/POSTメソッドを export する必要がある　GraphQL API として動作
// ❗ GET/POST は Request を引数に受け取る関数として書く
// Next.js の App Router では `context` を第2引数で受け取る！
export async function GET(request: Request, context: any) {
  return yoga.handleRequest(request, context);
}

export async function POST(request: Request, context: any) {
  return yoga.handleRequest(request, context);
}
// http://localhost:3000/api/graphql
