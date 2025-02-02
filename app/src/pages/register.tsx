import type React from "react";
import { useForm } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const REGISTER_MUTATION = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    createUser(
      createUserInput: { name: $name, email: $email, password: $password }
    ) {
      _id
      name
      email
    }
  }
`;

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string; email: string; password: string }>();

  const navigate = useNavigate();
  const [registerUser] = useMutation(REGISTER_MUTATION);

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await registerUser({ variables: data });
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div>
        <p>Register</p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name?.message as string}</p>
            )}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email?.message as string}</p>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500">
                {errors.password?.message as string}
              </p>
            )}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
