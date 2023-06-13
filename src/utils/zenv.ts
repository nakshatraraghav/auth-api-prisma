import { z } from "zod";
import logger from "./logger";
import { config } from "dotenv";
config();

const schema = z.object({
  PORT: z.string(),
  DATABASE_URL: z.string(),
  PRIVATE_KEY: z.string(),
  ACCESS_TOKEN_TTL: z.string(),
  REFRESH_TOKEN_TTL: z.string(),
});

function zenv() {
  try {
    const env = schema.parse(process.env);
    logger.info("env variables are valid and parsed successfully");
    return env;
  } catch (error) {
    logger.error("invalid env variables");
    logger.error(error);
    process.exit(1);
  }
}

export const env = zenv();
