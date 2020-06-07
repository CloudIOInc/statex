const cloneDeep = require('lodash.clonedeep');

module.exports = function webpackConfig() {
  return {
    configureWebpack(config, isServer) {
      const babelJsxRule = config.module.rules.find(
        (rule) => String(rule.test) === String(/\.(j|t)sx?$/),
      );
      const babelLoader = cloneDeep(babelJsxRule);
      babelLoader.use[1].options.plugins = [
        ...babelLoader.use[1].options.plugins,
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-numeric-separator',
      ];
      config.module.rules.push(babelLoader);

      config.resolve.extensions = [
        '.wasm',
        '.mjs',
        '.json',
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
      ];
    },
  };
};
