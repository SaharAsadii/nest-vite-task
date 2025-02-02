import type React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_EVENTS = gql`
  query GetEvents {
    events {
      _id
      title
      description
      date
      organizer {
        name
      }
    }
  }
`;

const Home: React.FC = () => {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.events.map(
          (event: {
            _id: string;
            title: string;
            description: string;
            date: string;
            organizer: { name: string };
          }) => (
            <div key={event._id}>
              <div>
                <p>{event.title}</p>
              </div>
              <div>
                <p>{event.description}</p>
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>Organizer: {event.organizer.name}</p>
                <Link to={`/event/${event._id}`}>
                  <button className="mt-2">View Details</button>
                </Link>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
