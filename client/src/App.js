import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddTrip from "./pages/AddTrip";
import AddLocation from "./pages/AddLocation";
import AddFood from "./pages/AddFood";
import UpdateFood from "./pages/UpdateFood";
import AddLodging from "./pages/AddLodging";
import AddTransportation from "./pages/AddTransportation";
import AddThingsToDo from "./pages/AddThingsToDo";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className=" flex flex-col justify-start min-h-screen">
          <Header />
          <div className="flex flex-1 justify-center">
            <main className="w-8/12 mt-4">
              <Routes>
                <Route path="/" element={<Login />} />
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/addLocation" element={<AddLocation />} />
                <Route path="/addTrip" element={<AddTrip />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/addFood" element={<AddFood />} />
                <Route path="/updateFood" element={<UpdateFood />} />
                <Route path="/addLodging" element={<AddLodging />} />
                <Route path="/addTransportation" element={<AddTransportation />} />
                <Route path="/addThingsToDo" element={<AddThingsToDo />} />
              </Routes>
            </main>
          </div>
          <footer className="bg-primary ">
            <Footer />
          </footer>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
