import type React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useAuth } from "../hooks/use-auth";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
    <div>
      <div>
        <p>{event.title}</p>
      </div>
      <div>
        <p>{event.description}</p>
        <p>Date: {new Date(event.date).toLocaleString()}</p>
        <p>Organizer: {event.organizer.name}</p>
        <h3 className="mt-4 mb-2 font-bold">rsvps:</h3>
        <ul>
          {event.rsvps.map(
            (rsvp: { _id: string; user: { name: string }; status: string }) => (
              <li key={rsvp._id}>
                {rsvp.user.name}: {rsvp.status}
              </li>
            )
          )}
        </ul>
        {user && !event.isFrozen && (
          <div className="mt-4">
            <select
              onChange={(e) => handleRSVP(e.target.value)}
              defaultValue={userRSVP?.status || ""}
            >
              <button>
                <option value="" disabled>
                  Select RSVP status
                </option>
              </button>
              <div>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="maybe">Maybe</option>
              </div>
            </select>
          </div>
        )}
        {user?._id === event.organizer._id && !event.isFrozen && (
          <button onClick={handleFreezeEvent} className="mt-4">
            Freeze rsvps
          </button>
        )}
        {event.isFrozen && (
          <p className="mt-4 font-bold">rsvps are frozen for this event.</p>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
