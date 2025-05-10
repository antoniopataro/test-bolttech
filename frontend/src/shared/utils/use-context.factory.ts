import { useContext } from "react";

export const useContextFactory = <T>(name: string, ctx: React.Context<T>) => {
  const c = useContext(ctx);

  if (!c) {
    throw new Error(`${name} must be used within a provider`);
  }

  return c;
};
