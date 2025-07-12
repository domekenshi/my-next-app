// GraphQLサーバーを作る関数
import { createYoga } from "graphql-yoga";
// スキーマ定義（型＆ロジック）
import { createSchema } from "graphql-yoga";

const yoga = createYoga({
  // GraphQLサーバーの「設計図」を定義
  schema: createSchema({
    //   hello クエリが使えるという定義
    typeDefs: `type Query {
    hello: String!
    greet(name: String): String!
     }`,
    //   呼ばれたときの処理ロジック(レスポンス)
    resolvers: {
      Query: {
        hello: () => "Hello from GraphQL",
        greet: () => "Hello from greet",
      },
    },
  }),
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Request, Response }, // これがないと Next.js の route.ts の中で動かせない
});
// Next.js App Router の route.ts では GET/POSTメソッドを export する必要がある　GraphQL API として動作
export { yoga as GET, yoga as POST };
