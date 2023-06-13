import db from "./db.server";
import logger from "./logger";

export default async function connect() {
  try {
    await db.$connect();
    logger.info("server connected to planetscale");
  } catch (error) {
    logger.error("server failed to connect to planetscale");
    logger.error(error);
  }
}
