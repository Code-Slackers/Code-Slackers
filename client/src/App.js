import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Auth from "./utils/auth";

import Footer from "./components/Footer";
import Header from "./components/Header";
import AddFood from "./pages/AddFood";
import AddLocation from "./pages/AddLocation";
import AddLodging from "./pages/AddLodging";
import AddThingsToDo from "./pages/AddThingsToDo";
import AddTransportation from "./pages/AddTransportation";
import AddTrip from "./pages/AddTrip";
import Home from "./pages/Home";
import Login from "./pages/Login";
import QueryLocation from "./pages/QueryLocation";
import Signup from "./pages/Signup";
import UpdateFood from "./pages/UpdateFood";
import ViewFood from "./pages/ViewFood";
import ViewLodging from "./pages/ViewLodging";
import ViewSelections from "./pages/ViewSelections";
import ViewThingsToDo from "./pages/ViewThingsToDo";
import ViewTransportation from "./pages/ViewTransportation";
import ViewTripsByLocation from "./pages/ViewTripsByLocation";

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
        <div className="flex flex-col justify-start min-h-screen ">
          <Header />

          <div className="flex flex-1 px-4 ">
            <main className="container mx-auto">
              <Routes>
                {Auth.loggedIn() ? (
                  <>
                    <Route path="/" element={<Home />} />
                    <Route path="/addLocation" element={<AddLocation />} />
                    <Route path="/addTrip/:locationId" element={<AddTrip />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/updateFood/:ID" element={<UpdateFood />} />
                    <Route path="/addLodging" element={<AddLodging />} />
                    <Route path="/addTransportation" element={<AddTransportation />} />
                    <Route path="/addThingsToDo" element={<AddThingsToDo />} />
                    <Route path="/addFood" element={<AddFood />} />
                    <Route path="/Location/:st" element={<QueryLocation />} />
                    <Route path="/selectedLocation/:locationId/:tripId" element={<ViewSelections />} />
                    <Route path="/viewfood/:locationId/:tripId" element={<ViewFood />} />
                    <Route path="/viewtransportation/:locationId/:tripId" element={<ViewTransportation />} />
                    <Route path="/viewlodging/:locationId/:tripId" element={<ViewLodging />} />
                    <Route path="/viewthingstodo/:locationId/:tripId" element={<ViewThingsToDo />} />
                    <Route path="/viewtripsbylocation/:locationId" element={<ViewTripsByLocation />} />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                  </>
                )}
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
