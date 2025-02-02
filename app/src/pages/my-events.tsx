import type React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

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
  const { loading, error, data } = useQuery(GET_MY_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { me } = data;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">My Events</h1>
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
