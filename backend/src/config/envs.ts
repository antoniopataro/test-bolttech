import dotenv from "dotenv";

import { requireEnv } from "@/shared/utils/require-env";

import { DEFAULT_SERVER_PORT } from "../shared/constants";

dotenv.config();

export const envs = {
  JWT_SECRET: requireEnv("JWT_SECRET"),
  SERVER_PORT: process.env["SERVER_PORT"] ?? DEFAULT_SERVER_PORT,
} as const;

export type Envs = typeof envs;
