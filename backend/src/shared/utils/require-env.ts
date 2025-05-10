export const requireEnv = (key: string): string => {
  const env = process.env[key];

  if (!env) {
    throw new Error(`${key} environment variable is required`);
  }

  return env;
};
