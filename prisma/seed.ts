import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const user = await prisma.user.upsert({
  //   where: { email: "root@root.com" },
  //   update: {},
  //   create: {
  //     email: "root@root.com",
  //     password: "supersecretpassword",
  //   },
  // });
  // console.log({ user });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
