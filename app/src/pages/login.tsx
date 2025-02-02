import type React from "react";
import { useForm } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      accessToken
    }
  }
`;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();
  const [login] = useMutation(LOGIN_MUTATION);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const result = await login({ variables: data });
      console.log({ result });
      setToken(result.data.login.accessToken);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div>
        <p>Login</p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
