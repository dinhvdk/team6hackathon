import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import { PrismaClient } from "@prisma/client";
import cors from "@fastify/cors";
import userRoutes from "./modules/user/user.route";
import watchListRoutes from "./modules/watchlist/watchlist.route";
export const prisma = new PrismaClient();

const buildServer = async () => {
  const fastify = Fastify({ logger: true });
  // Register Prisma client as a Fastify plugin
  fastify.decorate("prisma", prisma);

  // Register Swagger
  fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: "Fastify with TypeScript",
        description: "API documentation",
        version: "1.0.0",
      },
    },
  });

  await fastify.register(import("@fastify/swagger-ui"), {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  fastify.register(userRoutes, { prefix: "/user" });
  fastify.register(watchListRoutes, { prefix: "/users/watchlist" });

  return fastify;
};

// Start the server
const startServer = async () => {
  const server = await buildServer();
  try {
    server.listen({ port: 3001 });
    // server.listen({ port: 3002, host: "10.40.0.160" });
    server.register(cors, {});
    console.log("Server listening on http://locahost:3001");
    console.log("Swagger available at http://locahost:3001/documentation");
  } catch (err) {
    // server.log.error(err);
    process.exit(1);
  }
};

startServer();
