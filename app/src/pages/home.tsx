import { Card, Title } from "@/components";
import { gql, useQuery } from "@apollo/client";
import { Loader } from "lucide-react";
import React from "react";

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
      <Title>Upcoming Events</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.events.map(
          (event: {
            _id: string;
            title: string;
            description: string;
            date: string;
            organizer: { name: string };
          }) => (
            <Card event={event} />
          )
        )}
      </div>
    </div>
  );
};

export default Home;
