import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useUser } from "@/contexts/user.context";
import { Button } from "@/ui/components/button/button";

import { loginSchema, type LoginSchema } from "./login.schema";
import { components } from "./login.styles";

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const { isLoadingLogin, login } = useUser();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(
    async (data: LoginSchema) => {
      const success = await login(data);

      if (!success) {
        return;
      }

      navigate("/");
    },
    [login, navigate],
  );

  return (
    <components.root onSubmit={form.handleSubmit(onSubmit)}>
      <components.container>
        <components.header.root>
          <components.header.title>carental</components.header.title>
          <components.header.subtitle>
            Login or{" "}
            <components.header.link to="/register">
              register
            </components.header.link>{" "}
            to continue.
          </components.header.subtitle>
        </components.header.root>
        <components.fields.root>
          <components.fields.input.root>
            <components.fields.input.input
              {...form.register("email")}
              disabled={isLoadingLogin}
              placeholder="Email"
            />
            {form.formState.errors.email && (
              <components.fields.input.error>
                {form.formState.errors.email.message}
              </components.fields.input.error>
            )}
          </components.fields.input.root>
          <components.fields.input.root>
            <components.fields.input.input
              {...form.register("password")}
              disabled={isLoadingLogin}
              placeholder="Password"
              type="password"
            />
            {form.formState.errors.password && (
              <components.fields.input.error>
                {form.formState.errors.password.message}
              </components.fields.input.error>
            )}
          </components.fields.input.root>
        </components.fields.root>
        <Button
          disabled={isLoadingLogin}
          loading={isLoadingLogin}
          type="submit"
        >
          Login
        </Button>
      </components.container>
    </components.root>
  );
};
