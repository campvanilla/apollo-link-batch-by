import { ApolloClient, InMemoryCache, ApolloLink, gql } from "@apollo/client";
import { BatchHttpLink } from "@apollo/client/link/batch-http";

const link = new BatchHttpLink({ uri: "https://api.spacex.land/graphql" });

const client = new ApolloClient({
  // uri: "https://api.spacex.land/graphql",
  cache: new InMemoryCache(),
  link,
});

(async () => {
  const oneResponse = client.query({
    query: gql`
      query One {
        launchesPast(limit: 10) {
          mission_name
          launch_date_local
        }
      }
    `,
  });

  const twoResponse = client.query({
    query: gql`
      query Two {
        launchesPast(limit: 10) {
          rocket {
            rocket_name
          }
        }
      }
    `,
  });

  const both = await Promise.all([oneResponse, twoResponse]);
  console.log({ both });
})();