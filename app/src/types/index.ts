export type UserType = {
  _id: string;
  name: string;
  email: string;
};

export type EventType = {
  _id: string;
  title: string;
  description: string;
  date: string;
  organizer: {
    name: string;
  };
};
