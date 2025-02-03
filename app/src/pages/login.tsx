import type React from "react";
import { useForm } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Button, Input, Title } from "@/components";
import { useAuth } from "@/context/auth-context";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      accessToken
      user {
        _id
        email
        name
      }
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
  const { setUserInfo } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const result = await login({ variables: data });

      setUserInfo(result.data.login);

      const redirectTo =
        new URLSearchParams(location.search).get("redirectTo") || "/";
      navigate(redirectTo);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto shadow-lg p-8 bg-white rounded-lg py-16">
      <Title>Login</Title>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            id="email"
            type="email"
            label="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email?.message as string}</p>
          )}
        </div>
        <div>
          <Input
            id="password"
            type="password"
            label="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password?.message as string}</p>
          )}
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
