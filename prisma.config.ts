import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Prisma 7 expects "url" directly as string
    url: process.env.DATABASE_URL!,
    // OR you can also use: url: env("DATABASE_URL") with import { env } from 'prisma/config';
  },
  migrations: {
    path: "prisma/migrations",
  },
});
