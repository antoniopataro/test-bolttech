import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useUser } from "@/contexts/user.context";
import { Button } from "@/ui/components/button/button";

import { registerSchema, type RegisterSchema } from "./register.schema";
import { components } from "./register.styles";

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const { isLoadingRegister, register } = useUser();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = useCallback(
    async (data: RegisterSchema) => {
      const success = await register(data);

      if (!success) {
        return;
      }

      navigate("/");
    },
    [register, navigate],
  );

  return (
    <components.root onSubmit={form.handleSubmit(onSubmit)}>
      <components.container>
        <components.header.root>
          <components.header.title>carental</components.header.title>
          <components.header.subtitle>
            Register or{" "}
            <components.header.link to="/login">login</components.header.link>{" "}
            to continue.
          </components.header.subtitle>
        </components.header.root>
        <components.fields.root>
          <components.fields.input.root>
            <components.fields.input.input
              {...form.register("email")}
              disabled={isLoadingRegister}
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
              disabled={isLoadingRegister}
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
          disabled={isLoadingRegister}
          loading={isLoadingRegister}
          type="submit"
        >
          Register
        </Button>
      </components.container>
    </components.root>
  );
};
