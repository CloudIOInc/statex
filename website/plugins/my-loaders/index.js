module.exports = function webpackConfig() {
  return {
    name: 'my-loaders',
    configureWebpack(config, isServer) {
      const babelJsxRule = config.module.rules.find(
        (rule) => String(rule.test) === String(/\.(j|t)sx?$/),
      );
      babelJsxRule.use[1].options.plugins = [
        ...babelJsxRule.use[1].options.plugins,
        require.resolve('@babel/plugin-proposal-optional-chaining'),
        require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
        require.resolve('@babel/plugin-proposal-numeric-separator'),
      ];
    },
  };
};
