module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV !== 'production') {
      config.module.rule('js')
        .use('istanbul')
        .loader('istanbul-instrumenter-loader')
        .options({ esModules: true })
        .before('babel-loader');

      config.output
        .devtoolModuleFilenameTemplate('[absolute-resource-path]')
        .devtoolFallbackModuleFilenameTemplate('[absolute-resource-path]?[hash]');

      config.devtool('inline-cheap-module-source-map');
    }
  },
};
