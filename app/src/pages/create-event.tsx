import type React from "react";
import { useForm } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@/components";

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
    <div className="max-w-md mx-auto shadow-lg p-8 bg-white rounded-lg py-16">
      <h1 className="text-lg md:text-2xl font-bold mb-16 text-center">
        Create Event
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            label={"Title"}
            placeholder={""}
            id="title"
            type="text"
            {...register("title", { required: "Title is required" })}
          />

          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}
        </div>
        <div>
          <Input
            label={"Description"}
            multiline
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
          />

          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          )}
        </div>
        <div>
          <Input
            label={"Date"}
            placeholder={""}
            id="date"
            type="datetime-local"
            {...register("date", { required: "Date is required" })}
          />

          {errors.date && (
            <p className="text-red-500 text-xs">{errors.date.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Create Event
        </Button>
      </form>
    </div>
  );
};

export default CreateEvent;
