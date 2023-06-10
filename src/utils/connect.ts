import db from "./db.server";

export default async function connect() {
  try {
    await db.$connect();
    console.log("server connected to planetscale");
  } catch (error) {
    console.log("server failed to connect to planetscale");
    console.error(error);
  }
}
