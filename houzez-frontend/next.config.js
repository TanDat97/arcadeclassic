// @see: https://codeburst.io/next-js-boilerplate-with-tailwindcss-and-sass-ecc1df90f501
const tailwindCss = require("tailwindcss")
const withImages = require("next-images")
const withSass = require("@zeit/next-sass")
const withCSS = require("@zeit/next-css")

module.exports = withCSS(
  withSass({
    publicRuntimeConfig: {
      // Will only be available on the server side
      basePathEnv: process.env.NEXT_PUBLIC_BASE_PATH || "",
    },
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
    webpack(config, options) {
      const rules = [
        {
          test: /\.scss$/,
          use: [
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: [tailwindCss("./tailwind.config.js")],
              },
            },
            { loader: "sass-loader" },
          ],
        },
        {
          test: /\.css$/,
          loaders: ["style-loader", "css-loader"],
        },
        {
          test: /\.(jpg|png|gif|woff|woff2|eot|ttf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          issuer: {
            test: /\.(js|ts)x?$/,
          },
          loaders: ["@svgr/webpack", "file-loader"],
        },
      ]

      return {
        ...config,
        module: {
          ...config.module,
          rules: [...config.module.rules, ...rules],
        },
      }
    },
    // reactStrictMode: true,
    async redirects() {
      return [
        {
          source: "/order/confirmation",
          destination:
            (process.env.NEXT_PUBLIC_BASE_PATH || "") + "/order/confirmation",
          basePath: false,
          permanent: false,
        },
      ]
    },
  })
)
