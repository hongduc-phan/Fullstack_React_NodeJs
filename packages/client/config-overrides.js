const { override, fixBabelImports, addPostcssPlugins } = require("customize-cra");
const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = override(
  fixBabelImports("core", {
    libraryName: "@material-ui/core",
    libraryDirectory: "esm",
    camel2DashComponentName: false
  }),
  fixBabelImports("icons", {
    libraryName: "@material-ui/icons",
    libraryDirectory: "esm",
    camel2DashComponentName: false
  }),
  addPostcssPlugins([
    // Only purge & minify css on production
    process.env.NODE_ENV === "production"
      ? purgecss({
          content: ["./src/**/*.js", "./public/index.html"],
          defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || []
        })
      : () => [],
    require("cssnano")({
      preset: "default"
    })
  ])
);
