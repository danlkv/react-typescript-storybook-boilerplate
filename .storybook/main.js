module.exports = {
    "core":
    {
        builder: 'webpack5'
    },
    "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "webpackFinal": async (config, {configType}) => {
      /* Manipulate config here */

    config.resolve.extensions.push('.scss');
    config.resolve.extensions.push('.js');

    config.module.rules.push({
      test: /\.(less)$/,
      exclude: /(node_modules|bower_components)/,
      use: ['style-loader', 'css-loader', 'less-loader'],
    })

    return config;
  }
}
