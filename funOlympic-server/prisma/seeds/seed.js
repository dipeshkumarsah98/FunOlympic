import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function main() {
  const test1 = await prisma.user.upsert({
    where: { id: 1},
    update: {},
    create: {
			id: 1,
    	email: 'test1@prisma.io',
    	name: 'Name1',
      sport: "Football", 
    	phone: "+977-0808069899",
    	country: "Nepal", 
    	roles: "USER", password: "test123#"
    },
  })

	const test2 = await prisma.user.upsert({
    where: { id: 2},
    update: {},
    create: {
			id: 2,
    	email: 'test2@prisma.io',
    	name: 'Name2',
      sport: "Football", 
    	phone: "+977-0808069899",
    	country: "Nepal", 
    	roles: "USER", password: "test123#"
    },
  })
  
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })