import "dotenv/config";
import { app } from "./app";
import { env } from "./config/env";
import { connectToDatabase } from "./db/connect";

async function main() {
  await connectToDatabase();
  app.listen(env.PORT, () => {
    console.log(`sitewyre-backend listening on http://localhost:${env.PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
