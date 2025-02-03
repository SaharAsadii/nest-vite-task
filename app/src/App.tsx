import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";
import { Header } from "@/components";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import CreateEvent from "./pages/create-event";
import EventDetails from "./pages/event-details";
import MyEvents from "./pages/my-events";
import { AuthProvider } from "./context/auth-context";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Header />
            <main className="container mx-auto mt-16 px-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/my-events" element={<MyEvents />} />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
