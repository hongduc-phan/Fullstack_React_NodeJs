import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import { cacheExchange, createClient, dedupExchange } from "urql";

const client = createClient({
  url: "/graphql",
  fetchOptions: () => {
    const token = localStorage.getItem("accessToken");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  },

  exchanges: [dedupExchange, cacheExchange, multipartFetchExchange]
});

export default client;
