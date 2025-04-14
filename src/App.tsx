import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";

import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
      </div>
    </ApolloProvider>
  );
};

export default App;
