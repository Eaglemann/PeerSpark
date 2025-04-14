import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";

import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Navbar />
        {/* <Profile /> */}
      </div>
    </ApolloProvider>
  );
};

export default App;
