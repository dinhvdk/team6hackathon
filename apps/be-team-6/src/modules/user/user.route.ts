import { FastifyInstance } from "fastify";
import { prisma } from "../../server";

async function userRoutes(app: FastifyInstance) {
  app.post(
    "/register",
    {
      schema: {
        body: {
          type: "object",
          required: ["name", "address"],
          properties: {
            name: { type: "string", description: "Name of the user" },
            address: {
              type: "string",
              description: "Email of the user",
            },
            watchList: { type: "array" },
            info: { type: "object" },
          },
        },
        headers: {
          type: "object",
          properties: {
            onChainSign: { type: "string" }, // Define the header type
          },
          required: ["onChainSign"], // Make the header required for the route
        },
      },
    },
    async (request, reply) => {
      const headers = request.headers;
      const onchainsign = headers.onchainsign as string;
      console.log({ onchainsign });

      try {
        const { name, address, info } = request.body as {
          name: string;
          address: string;
          info: any;
        };
        const user = await prisma.user.findFirst({ where: { address } });
        if (user) {
          reply.status(500).send({ message: "User already exists" });
        }
        const newUser = await prisma.user.create({
          data: { name, address },
        });
        return newUser;
      } catch (error) {
        console.error("error", error);
        reply.status(500).send({ error: "Error went create" });
      }
    }
  );
  app.get("/:address", async (request, reply) => {
    try {
      const { address } = request.params as { address: string };
      const user = await prisma.user.findFirst({
        where: { address },
      });

      if (user) {
        return user;
      }
      const newUser = await prisma.user.create({
        data: { name: "Default Name ", address },
      });

      return newUser;
    } catch (error) {
      console.error("error", error);
      reply.status(500).send({ error: "Unknown error", raw: error });
    }
  });
}

export default userRoutes;
