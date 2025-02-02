import type React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  console.log({ isAuthenticated });
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Event Platform
        </Link>
        <nav>
          {isAuthenticated ? (
            <>
              <Link to="/create-event" className="mr-4">
                <button>Create Event</button>
              </Link>
              <Link to="/my-events" className="mr-4">
                <button>My Events</button>
              </Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">
                <button>Login</button>
              </Link>
              <Link to="/register">
                <button>Register</button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
