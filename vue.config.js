module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      externals: ['fs-extra', 'unzipper'],
      nodeModulesPath: ['../../node_modules', './node_modules']
    }
  }
}
