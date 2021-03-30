module.exports = {
  //outputDir: "build",// Для сервера http://46.161.48.157/
  pwa: {
    name: 'Radio ICE',
    themeColor: '#000000',
    msTileColor: '#2FC3FE',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
		assetsVersion: '',
		navigateFallback: 'index.html',
    workboxPluginMode: 'InjectManifest',
		iconPaths: {
			favicon32: 'img/icons/favicon-32x32.png',
			favicon16: 'img/icons/favicon-16x16.png',
			appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
			maskIcon: 'img/icons/safari-pinned-tab.svg',
			msTileImage: 'img/icons/msapplication-icon-144x144.png'
		},
    workboxOptions: {
      swSrc: './src/service-worker.js'
    }
  }
}