import { Link } from "react-router-dom";
import { Button } from "./button";
import { Calendar, User } from "lucide-react";
import { EventType } from "@/types";

interface CardProps {
  event: EventType;
}

export const Card: React.FC<CardProps> = ({ event }) => {
  return (
    <div
      key={event._id}
      className="bg-white shadow-lg p-6 rounded-lg overflow-hidden"
    >
      <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
      <p className="text-gray-400 mb-4">{event.description}</p>
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-500 mb-2">
          <Calendar className="inline-block mr-2" size={16} />
          Date: {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-500 mb-4">
          <User className="inline-block mr-2" size={16} />
          Organizer: {event.organizer.name}
        </p>
      </div>
      <Link to={`/event/${event._id}`}>
        <Button>View Details</Button>
      </Link>
    </div>
  );
};
