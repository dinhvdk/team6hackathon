import { any, z } from "zod";

export const watchListSchema = z.object({
  name: z.string(),
  metadata: z.record(z.any()),
  collections: z.array(z.record(z.any())),
  userAddress: z.string(),
});

export type WatchListSchemaType = z.infer<typeof watchListSchema>;

const example = {
  name: "My Second WatchList",
  metadata: {},
  userAddress: "0x4ce6F990e01f8bFb378079647D9D427Bc2d0AAf5",
  collections: [
    {
      contractAddress: "0xed5af388653567af2f388e6224dc7c4b3241c544",
      name: "Azuki",
      collectionSlug: "azuki",
      imageUrl:
        "https://images.blur.io/_blur-prod/0xed5af388653567af2f388e6224dc7c4b3241c544/4361-29b9f08af6d9c52f",
      totalSupply: 10000,
      numberOwners: 4204,
      floorPrice: { amount: "11.818", unit: "ETH" },
      floorPriceOneDay: { amount: "12.698890000000000455", unit: "ETH" },
      floorPriceOneWeek: { amount: "12.37999461999991", unit: "ETH" },
      volumeFifteenMinutes: null,
      volumeOneDay: { amount: "2840.483272389000016009", unit: "ETH" },
      volumeOneWeek: { amount: "13100.568308728100014175", unit: "ETH" },
      bestCollectionBid: { amount: "11.46", unit: "ETH" },
      totalCollectionBidValue: { amount: "726.37", unit: "ETH" },
      traitFrequencies: null,
      bestCollectionLoanOffer: { amount: "10.0", unit: "ETH" },
    },
  ],
};
