import { gql, useQuery } from "@apollo/client";
import { Calendar, Loader, User } from "lucide-react";
import React from "react";
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

  if (loading) return <Loader className="animate-spin mx-auto my-10" />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-16">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.events.map(
          (event: {
            _id: string;
            title: string;
            description: string;
            date: string;
            organizer: { name: string };
          }) => (
            <div
              key={event._id}
              className="bg-white shadow-lg p-6 rounded-lg overflow-hidden"
            >
              <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-gray-500 mb-2">
                  <Calendar className="inline-block mr-2" size={16} />
                  Date: {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-500 mb-4">
                  <User className="inline-block mr-2" size={16} />
                  Organizer: {event.organizer.name}
                </p>
              </div>
              <Link
                to={`/event/${event._id}`}
                className="bg-blue-500 w-full flex justify-center mt-4 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                View Details
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
