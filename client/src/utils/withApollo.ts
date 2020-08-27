import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";

export const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: "https://betterreads-gql.herokuapp.com//graphql",
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined" ? ctx.req?.headers.cookie : undefined) ||
        "",
    },
    cache: new InMemoryCache(),
  });

export const withApollo = createWithApollo(createClient);
