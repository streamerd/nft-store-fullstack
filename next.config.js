/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "ipfs.io",
      "www.macmillandictionary.com",
      "QmSLxBtAQo5a443mduMsCTYpaxPNL27uskKvCk9NVnoWPU",
      "gateway.ipfscdn.io",
    ],
  },
};

module.exports = nextConfig;
