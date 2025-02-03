import type React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAuth } from "@/context/auth-context";

const GET_MY_EVENTS = gql`
  query GetMyEvents {
    me {
      _id
      name
      events {
        _id
        title
        description
        date
        rsvps {
          _id
          user {
            _id
            name
          }
          status
        }
        isFrozen
      }
    }
  }
`;

const MyEvents: React.FC = () => {
  const { isAuthenticated } = useAuth(); // Assuming you have an AuthContext

  const { loading, error, data } = useQuery(GET_MY_EVENTS, {
    skip: !isAuthenticated, // Skip the query if the user is not authenticated
  });

  if (!isAuthenticated) {
    return (
      <p className="mt-24 text-center text-primary ">
        Please log in to view the events.
      </p>
    );
  }

  if (loading) return <Loader className="animate-spin" />;
  if (error) return <p>Error: {error.message}</p>;
  console.log({ data });
  const { me } = data;

  return (
    <div className="max-w-screen-xl mx-auto shadow-lg p-8 bg-white rounded-lg">
      <h1 className="font-bold mb-8">My events</h1>

      {me.events.map(
        (event: {
          _id: string;
          title: string;
          description: string;
          date: string;
          rsvps: {
            _id: string;
            user: { _id: string; name: string };
            status: string;
          }[];
          isFrozen: boolean;
        }) => (
          <div key={event._id} className="mb-4">
            <div>
              <p>{event.title}</p>
            </div>
            <div>
              <p>{event.description}</p>
              <p>Date: {new Date(event.date).toLocaleString()}</p>
              <p>rsvps: {event.rsvps.length}</p>
              <p>Status: {event.isFrozen ? "Frozen" : "Open"}</p>
              <Link to={`/event/${event._id}`}>
                <button className="mt-2">View Details</button>
              </Link>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MyEvents;
