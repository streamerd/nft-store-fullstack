// const dotenv = require("dotenv"); // Ensure your .env has the same keys as the .env.example

// dotenv.config();

// Github: https://github.com/alchemyplatform/alchemy-sdk-js
const { Network, initializeAlchemy, getNftMetadata } = require("@alch/alchemy-sdk");

// Optional Config object
const settings = {
  apiKey: process.env.NEXT_ALCHEMY_APIKEY,
  network: Network.ETH_MAINNET, 
  maxRetries: 10,
};

const alchemy = initializeAlchemy(settings);

export const getTokenMetadata = async (address, tokenId) => {
  const nftMetadata = await getNftMetadata(
    alchemy,
    address,
    tokenId
  );
  // console.log(`title: ${JSON.stringify(nftMetadata.title)}`);
  // console.log(`description: ${JSON.stringify(nftMetadata.description)}`);
  // console.log(`image url: ${JSON.stringify(nftMetadata.media[0].gateway)}`);
  return nftMetadata;
};

