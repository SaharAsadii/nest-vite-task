import type React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Calendar, Frown, Ghost, Laugh, Loader, User } from "lucide-react";
import { Button, Select, Title } from "@/components";
import { useAuth } from "@/context/auth-context";

const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      _id
      title
      description
      date
      organizer {
        _id
        name
      }
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
`;

const CREATE_RSVP_MUTATION = gql`
  mutation CreateRSVP($eventId: ID!, $status: String!) {
    createRSVP(createRSVPInput: { eventId: $eventId, status: $status }) {
      _id
      status
    }
  }
`;

const UPDATE_RSVP_MUTATION = gql`
  mutation UpdateRSVP($id: ID!, $status: String!) {
    updateRSVP(updateRSVPInput: { id: $id, status: $status }) {
      _id
      status
    }
  }
`;

const FREEZE_EVENT_MUTATION = gql`
  mutation FreezeEvent($id: ID!) {
    freezeEvent(id: $id) {
      _id
      isFrozen
    }
  }
`;

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data, refetch } = useQuery(GET_EVENT, {
    variables: { id },
  });
  const [createRSVP] = useMutation(CREATE_RSVP_MUTATION);
  const [updateRSVP] = useMutation(UPDATE_RSVP_MUTATION);
  const [freezeEvent] = useMutation(FREEZE_EVENT_MUTATION);
  const { user } = useAuth();

  if (loading) return <Loader className="animate-spin mx-auto my-20" />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const { event } = data;
  const userRSVP = event.rsvps.find(
    (rsvp: { user: { _id: string }; _id: string; status: string }) =>
      rsvp.user._id === user?._id
  );

  const handleRSVP = async (status: string) => {
    try {
      if (userRSVP) {
        await updateRSVP({ variables: { id: userRSVP._id, status } });
      } else {
        await createRSVP({ variables: { eventId: event._id, status } });
      }
      refetch();
    } catch (error) {
      console.error("RSVP error:", error);
    }
  };

  const handleFreezeEvent = async () => {
    try {
      await freezeEvent({ variables: { id: event._id } });
      refetch();
    } catch (error) {
      console.error("Freeze event error:", error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto shadow-lg md:p-8 p-4 bg-white rounded-lg py-16">
      <Title>{event.title}</Title>
      <div className="space-y-4">
        <p className="text-gray-700">{event.description}</p>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">
            <Calendar className="inline-block mr-2" size={16} />
            Date: {new Date(event.date).toLocaleString()}
          </p>
          <p className="text-gray-500">
            <User className="inline-block mr-2" size={16} />
            Organizer: {event.organizer.name}
          </p>
        </div>
        <hr />
        <h3 className="mt-4 mb-2 font-bold text-lg">RSVPs:</h3>
        <ul className="space-y-2">
          {event.rsvps?.length === 0 ? (
            <li className="flex justify-between items-center p-2 bg-gray-100 rounded-md">
              <span>No RSVPs yet</span>
            </li>
          ) : (
            event.rsvps.map(
              (rsvp: {
                _id: string;
                user: { name: string };
                status: string;
              }) => (
                <li
                  key={rsvp._id}
                  className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
                >
                  <span>{rsvp.user.name}</span>
                  <span
                    className={`flex items-center  px-2 py-1 rounded-full text-white ${
                      rsvp.status === "yes"
                        ? "bg-green-500"
                        : rsvp.status === "no"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {rsvp.status === "yes" ? (
                      <Laugh className="mx-1 animate-bounce" />
                    ) : rsvp.status === "no" ? (
                      <Frown className="mx-1" />
                    ) : (
                      <Ghost className="mx-1" />
                    )}
                    {rsvp.status.toLocaleUpperCase()}
                  </span>
                </li>
              )
            )
          )}
        </ul>
        <hr />
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          {user && !event.isFrozen ? (
            <div className="mt-4 flex-1 w-full">
              <Select
                label="RSVP status"
                onChange={(e) => handleRSVP(e.target.value)}
                defaultValue={userRSVP?.status || ""}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                  { value: "maybe", label: "Maybe" },
                ]}
              />
            </div>
          ) : (
            <p className="animate-bounce text-yellow-600 font-bold">
              Please login to RSVP
            </p>
          )}
          <div className="flex-1 w-full">
            {user?._id === event.organizer._id && !event.isFrozen && (
              <Button onClick={handleFreezeEvent} className="mb-4">
                Freeze RSVPs
              </Button>
            )}
            {event.isFrozen && (
              <p className="mt-4 font-bold text-center text-red-500">
                RSVPs are frozen for this event.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
