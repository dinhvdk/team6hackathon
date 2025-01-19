import { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { prisma } from "../../server";
import { watchListSchema, WatchListSchemaType } from "../../routes/watchlist";

async function watchListRoutes(fastify: FastifyInstance) {
  // create user watchlist with collection address, chain, name,
  fastify.post(
    "/upsert",
    {
      schema: {
        body: {
          type: "object",
          required: ["userAddress", "name", "metadata", "collections"],
          properties: {
            name: { type: "string", description: "Name of the watchlist" },
            userAddress: {
              type: "string",
              description: "userAddress for create",
            },
            metadata: {
              type: "object",
              description: "Metadata of the watchlist",
            },
            collections: {
              type: "array",
              items: {
                type: "object",
                description: "List of collections of watchlist",
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { name, metadata, collections, userAddress } =
          request.body as WatchListSchemaType;
        watchListSchema.parse(request.body);
        const currentUser = await prisma.user.findFirst({
          where: { address: userAddress },
        });
        const currentWatchList =
          currentUser?.watchList as WatchListSchemaType[];
        const isExist = currentWatchList.find(
          (watchList) => watchList.name === name
        );

        const updatedUser = await prisma.user.update({
          data: {
            watchList: isExist
              ? currentWatchList.map((watchList) => {
                  if (watchList.name === name) {
                    return { name, metadata, collections };
                  }
                  return watchList;
                })
              : [
                  ...currentWatchList,
                  {
                    name,
                    metadata,
                    collections,
                    id: Math.random().toString(16).slice(2),
                  },
                ],
          },
          where: { address: userAddress },
        });

        return updatedUser;
      } catch (error) {
        if (error instanceof ZodError) {
          reply
            .status(400)
            .send({ error: "Invalid data format", details: error.errors });
        } else {
          reply.status(500).send({ error: "Failed to update", raw: error });
        }
      }
    }
  );

  // delete watchlist by wlName
  fastify.post(
    "/delete",
    {
      schema: {
        body: {
          type: "object",
          required: ["userAddress", "wlName"],
          properties: {
            userAddress: {
              type: "string",
              description: "User address",
            },
            wlName: { type: "string", description: "Name of the watchlist" },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { wlName, userAddress } = request.body as {
          wlName: string;
          userAddress: string;
        };
        const currentUser = await prisma.user.findFirst({
          where: { address: userAddress },
        });
        const currentWatchList =
          currentUser?.watchList as WatchListSchemaType[];

        const updatedWatchList = currentWatchList.filter(
          (watchList) => watchList.name !== wlName
        );
        const updatedUser = await prisma.user.update({
          data: {
            watchList: updatedWatchList,
          },
          where: { address: userAddress },
        });
        return updatedUser;
      } catch (error) {
        reply.status(500).send({ error: "Failed to delete", raw: error });
      }
    }
  );
  // add a collection to watchlist
  fastify.post(
    "/collection/add",
    {
      schema: {
        body: {
          type: "object",
          required: ["userAddress", "wlName", "collection"],
          properties: {
            userAddress: {
              type: "string",
              description: "User address",
            },
            wlName: { type: "string", description: "Name of the watchlist" },
            collection: { type: "object", description: "Collection to add" },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { wlName, userAddress, collection } = request.body as {
          wlName: string;
          userAddress: string;
          collection: any;
        };
        const currentUser = await prisma.user.findFirst({
          where: { address: userAddress },
        });
        const currentWatchList =
          currentUser?.watchList as WatchListSchemaType[];
        const updatedWatchList = currentWatchList.map((watchList) => {
          if (watchList.name === wlName) {
            return {
              ...watchList,
              collections: [...watchList.collections, collection],
            };
          }
          return watchList;
        });
        const updatedUser = await prisma.user.update({
          data: {
            watchList: updatedWatchList,
          },
          where: { address: userAddress },
        });
        return updatedUser;
      } catch (error) {
        reply
          .status(500)
          .send({ error: "Failed to add collection", raw: error });
      }
    }
  );
  // remove a collection from watchlist
  fastify.post(
    "/collection/remove",
    {
      schema: {
        body: {
          type: "object",
          required: ["userAddress", "wlName", "collection"],
          properties: {
            userAddress: {
              type: "string",
              description: "User address",
            },
            wlName: { type: "string", description: "Name of the watchlist" },
            collection: { type: "object", description: "Collection to remove" },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { wlName, userAddress, collection } = request.body as {
          wlName: string;
          userAddress: string;
          collection: any;
        };
        const currentUser = await prisma.user.findFirst({
          where: { address: userAddress },
        });
        const currentWatchList =
          currentUser?.watchList as WatchListSchemaType[];
        const updatedWatchList = currentWatchList.map((watchList) => {
          if (watchList.name === wlName) {
            return {
              ...watchList,
              collections: watchList.collections.filter(
                (col) => col.contractAddress !== collection.contractAddress
              ),
            };
          }
          return watchList;
        });
        const updatedUser = await prisma.user.update({
          data: {
            watchList: updatedWatchList,
          },
          where: { address: userAddress },
        });
        return updatedUser;
      } catch (error) {
        reply
          .status(500)
          .send({ error: "Failed to remove collection", raw: error });
      }
    }
  );
}

export default watchListRoutes;
