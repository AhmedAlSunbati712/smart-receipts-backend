import prisma from "../src/db/prisma_client.ts";
import bcrypt from "bcrypt";

async function main() {
  const password1 = await bcrypt.hash("password1", 10);
  const password2 = await bcrypt.hash("password2", 10);

  await prisma.user.create({
    data: {
      firstName: "User1",
      lastName: "Last1",
      email: "user1@email.com",
      password: password1,
    },
  });

  await prisma.user.create({
    data: {
      firstName: "User2",
      lastName: "Last2",
      email: "user2@email.com",
      password: password2,
    },
  });
}

main()
  .then(() => {
    console.log("[+] Database seeded");
  })
  .catch((e) => {
    console.error("[!] Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
