/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },

  sassOptions: {
    prependData: `@import "src/assets/styles/variables.scss"; @import "src/assets/styles/mixins.scss";`,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t.me",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "titans-api-dev.techchaininnovations.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "titans-api-dev.techchaininnovations.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  reactStrictMode: false,
};

export default nextConfig;
