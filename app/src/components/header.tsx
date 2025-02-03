import type React from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "./button";
import { useAuth } from "@/context/auth-context";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-primary text-primary-foreground fixed top-0 w-full z-10 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="md:text-2xl text-lg font-bold">
          Event Platform
        </Link>
        <nav className="flex items-center">
          {isAuthenticated ? (
            <>
              <Link to="/create-event" className="mr-4">
                <Button>Create Event</Button>
              </Link>
              <Link to="/my-events" className="mr-4">
                <Button>My Events</Button>
              </Link>

              <LogOut className="cursor-pointer" onClick={logout} />
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">
                <Button>Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export { Header };
