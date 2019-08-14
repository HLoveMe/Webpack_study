* PWA 

	```
	结合浏览器缓存页面。在服务器挂掉的情况下能访问
	
	npm i 	workbox-webpack-plugin -D
	
	const WorkboxPlugin = require('workbox-webpack-plugin');
	plugins:[
		new new WorkboxPlugin.GenerateSW({
	    clientsClaim: true,
	    skipWaiting: true
	  })
	]
	
	html
		if ('serviceWorker' in navigator) {
		  window.addEventListener('load', () => {
		    navigator.serviceWorker.register('/service-worker.js') //调用打包生成的 sw.js
		      .then(registration => {
		        console.log('service-worker registed');
		      }).catch(error => {
		        console.log('service-worker register error');
		      })
		  })
		}
	```

