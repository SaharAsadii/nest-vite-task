import type React from "react";
import { useForm } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent(
    $title: String!
    $description: String!
    $date: DateTime!
  ) {
    createEvent(
      createEventInput: {
        title: $title
        description: $description
        date: $date
      }
    ) {
      _id
      title
      description
      date
    }
  }
`;

const CreateEvent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string; description: string; date: string }>();
  const [createEvent] = useMutation(CREATE_EVENT_MUTATION);

  const navigate = useNavigate();

  const onSubmit = async (data: {
    title: string;
    description: string;
    date: string;
  }) => {
    try {
      const result = await createEvent({ variables: data });
      navigate(`/event/${result.data.createEvent._id}`);
    } catch (error) {
      console.error("Create event error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div>
        <p>Create Event</p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              {...register("title", { required: "Title is required" })}
            />
            <p className="text-red-500">{errors.title?.message as string}</p>
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            <p className="text-red-500">
              {errors.description?.message as string}
            </p>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="datetime-local"
              {...register("date", { required: "Date is required" })}
            />
            <p className="text-red-500">{errors.date?.message as string}</p>
            {errors.date && (
              <p className="text-red-500">{errors.date.message}</p>
            )}
          </div>
          <button type="submit">Create Event</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
