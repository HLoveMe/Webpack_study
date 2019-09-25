webpack
========

* 介绍
  * 是一个模块打包工具
  * 基于nodejs开发ss

* 模块说明
  * Es6模块
  
	    ```
	    a.js
	        export class ABCD{}
	
	        export default const name = "猪猪"
	
	    b.js
	
	        import name,{ABCD} from "./a"
	
	    ```
  * commonJs模块
	
	    ```
	    a.js
	      module.exports = function(){} // 默认导出
	      或（不能同时出现）
	      exports.name = "猪猪"  // 默认导出
	
	    b.js
	
	       const AMoule = require("./a.js")
	
	    ```
  * AMD
    ```
    ```

* 安装

  * nodejs
  * npm webpack webpack-cli -D
  * npx webpack index.js

* 基于配置文件

  * webpack.config.js
  
    * 可以是对象 module.exports={}
    * 可是是函数 module.export =function(env, argv) {return{}}
    * 可以是Promise module.exports=()=>new Promise(()=>{resole({})})
    * 可以是多个目标 module.exports=[{},{}] 构建多个目标(多次打包)
    
	      ```
	      const path = require("path")
	      module.exports = {
	        entry:"./index.js"
	        output:{
	          filename:"main.js",
	          path:path.join(__dirname,"build")
	          
	          library:"XXV",
	          libraryTarget:"var"
	          publicPath:"./build/"
	        },
	        externals:{
	        	lodash:{
	        		commonjs:"lodash"
	        		commonjs2:"lodash",
	        		amd:"lodash",
	        		root:"_"
	        	}
	        },
	        devtools:"none"
	        module:[],
	        plugins:[],
	        target:""|func,
	        watch:true
	        watchOptions:{},
	        resolve:{}
	        devServer:{},
	        mode: 'development',
	        optimization:{}
	      }
	      ```
    * 说明
      * entry 表示打包的入口文件
      
	        ```
	          string | [] | {}| func 
	          	"[hash]_main.js"
					[hash] 模块标识符(module identifier)的 hash
					[chunkhash] chunk 内容的 hash
					[name] 模块名称
					[id] 模块标识符(module identifier)
					[query] 模块的 query，例如，文件名 ? 后面的字符串
	          entry:"./index.js"  ==>入口为index.js==>main.js
	       
      			{
      				aa:'./index.js' 入口为index.js 打包输出为aaa.js
      			}
	
	          多入口=>[多个文件] entry:{
	          		home:"index.js",  ===>打包输出文件叫做 home.js
	          		hello:"xx.js"  ===>打包输出文件叫做 hello.js
	          }          
		          * 页面(html)会导入所有入口js文件
		          * [多页面]处理 见 【多页面打包】
	          
	          
	          
	
	          动态入口 entry:()=>xx
	                        ()=>Promise
        ```
      * output 表示打包文件输入
       
	        ```
	        {
	          filename:"" 输出文件名 
	          	如果entry为多次打包 可以使用展位符
	          chunkFilename:"",
	          	入口文件 进行代码分割chunk文件名称[static/js/[name].[contenthash:8].chunk.js]
	          path:__dirpath+"/output" 输出文件夹（默认为当前目录文件夹）
	          
	          
	          library:"JQuery" 如何处理入口文件导出的变量 赋值在JQuery
	          libraryTarget:"var" 入口文件导出的变量 作用做哪个作用域上
	          	var 作为一个全局变量，通过 script 标签来访问（libraryTarget:'var'）。
	          	this：通过 this 对象访问（libraryTarget:'this'）。
	          	window：通过 window 对象访问，在浏览器中（libraryTarget:'window'）。
	          	UMD：在 AMD 或 CommonJS 的 require 之后可访问（libraryTarget:'umd'）。兼容性大
						
	           publicPath:"" 会添加到所有引用路径前 (相对加载的html页面路径)
					publicPath: "/assets/", // 相对于服务(server-relative)
					publicPath: "assets/", // 相对于 HTML 页面
					publicPath: "../assets/", // 相对于 HTML 页面
					publicPath: "", // 相对于 HTML 页面（目录相同）
	        }
	        ```
	       
  		* externals 把内部对于第三方依赖 交给用户
  			
  			```
  			某些库不需要webpack打包 而是手动通过scrpt导入
  			```
  		* devtools 控制是否生成，以及如何生成 source map
  			
  			```
  			构建source map格式增强调试功能
  				cheap 表示仅仅定位到行 不要精确到哪个单词 (不管第三方代码)
  				module 映射第三方库
  				eval 使用eval执行 创建映射 最快的方式
  				inline souce-map 合并到文件中
  				
  			开发环境 （
  				推荐使用
  				eval-source-map
  				cheap-module-eval-source-map
  			）
	  			source-map	在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包速度；
				cheap-module-source-map	在一个单独的文件中生成一个不带列映射的map，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；
				eval-source-map	使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项；
				cheap-module-eval-source-map 这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点；大型项目 不利于调试
  			
  			生产坏境
	  			推荐使用 cheap-module-source-map
				source-map - 整个 source map 作为一个单独的文件生成
  			```
  		* mode
  			
  			```
  			指明打包的环境
  				mode: 'development | production'
  				“webpack --development”
  			开启不同的打包插件
  				"development"
  				webpack.NamedModulesPlugin
				webpack.DefinePlugin
				
				"production"
				UglifyJsPlugin
				webpack.DefinePlugin
				webpack.optimize.ModuleConcatenationPlugin
				webpack.NoEmitOnErrorsPlugin
			不同的环境变量
				process.env.NODE_ENV == ""
				区别打包之后的环境
				
			不同的默认值
				development
					//调试
					devtool:eval
					//缓存模块, 避免在未更改时重建它们。
					cache:true
					//缓存已解决的依赖项, 避免重新解析它们。
					module.unsafeCache:true
					//在 bundle 中引入「所包含模块信息」的相关注释
					output.pathinfo:true
					//在可能的情况下确定每个模块的导出,被用于其他优化或代码生成。
					optimization.providedExports:true
					//找到chunk中共享的模块,取出来生成单独的chunk
					optimization.splitChunks:true
					//为 webpack 运行时代码创建单独的chunk
					optimization.runtimeChunk:true
					//编译错误时不写入到输出
					optimization.noEmitOnErrors:true
					//给模块有意义的名称代替ids
					optimization.namedModules:true
					//给模chunk有意义的名称代替ids
					optimization.namedChunks:true
					//parent chunk中解决了的chunk会被删除
					optimization.removeAvailableModules:true
					//删除空的chunks
					optimization.removeEmptyChunks:true
					//合并重复的chunk
					optimization.mergeDuplicateChunks:true
					
				production
					//性能相关配置
					performance:{hints:"error"....}
					//某些chunk的子chunk已一种方式被确定和标记,这些子chunks在加载更大的块时不必加载
					optimization.flagIncludedChunks:true
					//给经常使用的ids更短的值
					optimization.occurrenceOrder:true
					//确定每个模块下被使用的导出
					optimization.usedExports:true
					//识别package.json or rules sideEffects 标志
					optimization.sideEffects:true
					//尝试查找模块图中可以安全连接到单个模块中的段。- -
					optimization.concatenateModules:true
					//使用uglify-js压缩代码
					optimization.minimize:true
					//parent chunk中解决了的chunk会被删除
					optimization.removeAvailableModules:true
					//删除空的chunks
					optimization.removeEmptyChunks:true
					//合并重复的chunk
					optimization.mergeDuplicateChunks:true
  			```
  			
  		* module
  			
  			```
  			用于配置Loader
  			```
  			
  		* target 指定你的编译后的代码在哪里运行
  			
  			```
  			node 编译为类 Node.js 环境可用（使用 Node.js require 加载 chunk）
  			node-webkit 编译为 Webkit 可用，并且使用 jsonp 去加载分块
  			web 编译为类浏览器环境里可用（默认）
  			webworker 编译成一个 WebWorker
  			```
  		* watch 是否热更新
		* watchOptions
		
		  	 ```
		  	 开启后会在文件更新后 自动编译文件;
		  	 watchOptions:{
		  	 	aggregateTimeout:300 时间间隔
		  	 	ignored: /node_modules/ 忽略  "files/**/*.js"
		  	 	
		  	 	poll: 1000  //通过true 或者间隔 开启进行轮询===》编译
		  	 }
		  	 
		  	 webpack --progress 开启监听进度显示
		  	 ```	
		  	 
		* resolve 告诉webpack 如何解析相关语句

			```
			别名 配置模块如何解析
			alias:{
					"@":path.join(__dirname,"src"),
					Tools:path.join(__dirname,"src","Tools"),
					Date:path.join(__dirname,"src","Tools","Date"),
					DateTool$:path.resolve(__dirname, 'src/Tools/Date.js')
			}
				三个导入方式是一致的
				import { currentDate } from "Date";
				import { currentDate } from "@/Tools/Date";
				import {  } from "../Tools/Date";
				
				import {currentDate} from "DateTool" //精准搜索
				
			指定描述文件
			descriptionFiles
				resolve.descriptionFiles = [""package.json""]
				
			关于不指定js后缀
			enforceExtension
				resolve.enforceExtension = false
					false require("./foot") == require("./foot.js")
					true  require("./foot") !== require("./foot.js") 必须加后缀
			关于默认后缀
			extensions
				resolve.extensions = [".json",".js"] 
					.json 和.js 后缀不需要写 	
					require("./foot") == require("./foot.js")
					require("./city") == require("./city.json")
				[".json",".js",".jsx"] 
				
			如何解析第三方导入
			mainFields [d]
				第三方pacack.json
					{
					  ...
					  main: 'build/d3.Node.js',
					  browser: 'build/d3.js',
					  module: 'index',
					  ...
					}
					
				target:"web" | "webworker" | none
					默认的 mainFields = ["browser", "module", "main"]
					import * as D3 from "d3"
					 	D3==>(browser: 'build/d3.js',)
				
				target为其他值（包括 node）
				默认的 mainFields = ["module", "main"]
				import * as D3 from "d3"
					target:"node" D3==>(module: 'index') 没有module则 (main: 'build/d3.Node.js')	
					
			如何处理导入文件夹		
			mainFiles		
				mainFiles: ["index"]
					import { XX } from "./Tool"
					import { XX } from "./Tool/index.js"
				
			如何搜索模块目录
			modules
				modules = ["node_modules"]	
				
				添加一个搜索目录 (优先级高于node_modules)
				modules: [path.resolve(__dirname, "src"), "node_modules"]
				
				
			额外的解析插件列表	
			plugins:[]
			
			简化loader名称
			moduleExtensions
				moduleExtensions: [ '-loader' ]
				
				{
					loader:"style" === loader:"style-loader"
				}
	
			```
		* devServer 开启本地服务支持浏览器刷新 i
			
			```
			 npm i webpack-dev-server -D
			 devServer:{
			 	contentBase: path.join(__dirname, "dist"),本地路径
			  	compress: true,//压缩选项
			  	port: 9000,端口
			  	open:自动打开浏览器,
			  	proxy:{} //代理 跨域处理
			 }
			 
			 "watch-server":"node_modules/.bin/webpack-dev-server"
			 
			 webpack-dev-server 会把打包的文件放在电脑内存中 提示打包速度
			 
			 问题：
			 	如果网页无法打开 可以查看output.publicPath
			 
			```	
		* optimization

			```
			1:代码分割 (SplitChunksPlugin默认插件)
				optimization{
					runtimeChunk:
						true ==>runtime~[name]
						{
							name:entrypoint => `runtime~${entrypoint.name}`
						}
						"single" 
						"multiple"
					//runtime:连接模块化应用程序的所有代码.
					//runtime包含:在模块交互时,连接模块所需的加载和解析逻辑。包括浏览器中的已加载模块的连接，以及懒加载模块的执行逻辑.
					splitChunks:{
						chunks: "async", async 对异步代码打包 all 对所有代码生效
					    minSize: 30000,//分割最小文件
					    maxSize:0,//最大的size > maxSize 尝试再次分割 可不配置
					    minChunks: 3,//文件用到几次才进行分割
					    maxAsyncRequests: 5,
					    	//同时加载的模块数为5
					    maxInitialRequests: 3,
					    	//入口文件 加载的库 进行代码分割只能分割为3个
					    automaticNameDelimiter: '~',
					    name: true,
					    cacheGroups: {// 设置缓存组用来抽取满足不同规则的chunk
					        vendors: { 
					            test: /[\\/]node_modules[\\/]/
					            	 //判断分割文件是否在npm库 如果符合 则放在vendors组下
					            priority: -10,
					            	//优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中
					            //name:""
					            //filename:"[name].bundle.js" 自定义名称 所有[vendors]的都放在这个文件			
					   					//[name]默认为"vendors"(key值)
					   					//name属性为修改[name]变量  
					   					//替代output.chunkFilename      		
					        	 chunks:"all" 单独配置
					            	这里替换splitChunks.chunks
					            		
					            minChunks:2
					            reuseExistingChunk: true
						            	//如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
						         enforce:true
						         	//忽略 min|maxSize maxAsyncRequests maxInitialRequests
						         	//就是要独立js chunks
					            //dome:[打包出] vendors~+导入该库文件名称
					            	"vendor~xx.js"  > 属于verdor组 + ~ + xx 入库文件名称
					        },
						    default: {//如果该文件分割 不知道在哪个组 使用default配置
						            minChunks: 2,
						            priority: -20,
						            
						            
						    },
						    styles:{
						    	test:"
						    }
					    }
					}
				}
			
			```
		
			
* 实时更新
	
	```
	编译实时刷新
		1: "watch":"webpack --watch"
		2: watch:true
		
	实时查看网页/运行
		见 devServer
	```	 
*  HMR

	[React](https://github.com/gaearon/react-hot-loader)
	
	[Vue](https://github.com/vuejs/vue-loader)
	
	[Angular](https://github.com/gdi2290/angular-hmr)
	
	[其他](https://webpack.js.org/guides/hot-module-replacement/#enabling-hmr)
	
*  HMR 刷新部分代码（只刷新css样式文件 | 刷新某个js）
	
	开启(编译实时刷新 开启网页实时刷新)
		
	```
	devServer:{
		hot:true, //开启
		hotOnly:true //hot刷新 不要刷新浏览器
	}
	//const webpack = require("webpack");
	plugins:[
		new webpack.HotModuleReplacementPlugin()
	]	 
	开启HMR后  HMR接口会保留在module.hot下
	
	1:css HMR 会实时刷新
	2:js HMR 模块文件修改后 如何实时刷新页面
		c.js
			import a from "./a.js"	
			import b from "./b.js"
			a()
			b()
		
			//如果b文件更新 c文件可能不会刷新
			if(module.hot){
				module.hot.accept("../b.js"|[],()=>{
					在文件刷新后调用
				})
				//不接受该文件刷新处理
				module.hot.decline("../b.js"|[])
				
				//当前模块更新后调用
				module.hot.dispose  || removeDisposeHandler
				
				module.hot.status 获取当前状态
					idle 该进程正在等待调用 check（见下文）
					check 该进程正在检查以更新
					prepare 该进程正在准备更新（例如，下载已更新的模块）
					ready 此更新已准备并可用
					dispose 该进程正在调用将被替换模块的 dispose 处理函数
					apply 该进程正在调用 accept 处理函数，并重新执行自我接受(self-accepted)的模块
					abort 更新已中止，但系统仍处于之前的状态
					fail 更新已抛出异常，系统状态已被破坏
				module.hot. addStatusHandler | removeStatusHandler
					增加 移除状态改变监听
				
				module.hot.check
				module.hot.apply
			}
		
		
	``` 
* Tree Shaking

	```
	去除无用代码。仅仅支持ESModule 代码
	development模式下
		webpack={
			optimization:{
				usedExports:true //开启Tree
			}
		}
		package.json={
			sideEffects:false，//不需要tree Shaking
			sideEffects:[ //不需要tree Shaking
				"$.css",
				"$.scss"
			]
		}
	production
		webpack 不需要配置
		package 需要配置
		
	存在的问题
		一些文件导入,没有使用，但是代码是有用的。打包之后无该文件。
			dome:  body{padding:0} 配置sideEffects
	```	
		
			 
* Library [编译之后你的库 作为第三方库 提供使用](https://www.webpackjs.com/guides/author-libraries/#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA-library)
  		
	```
	output:{
		library:"XXV",
		libraryTarget:"var"
	}
	```
  	
* [Loader](./Loader.md)

* Shimming

	```
	 支持导入那些不符合ES2015规范的模块
	 
	 减少import require
	 
	 自定义导出
	``` 

	* 导入全局变量

		```
		npm i jquery
		
			方式一：import $ from "juery"
			方式二：
				new webpack.ProvidePlugin({
		      		$: 'jquery',
		      		jQuery: 'jquery'
		    	})
		    	
		    	直接使用 $ 或者 jQuery
	    	
		npm i loadsh
			仅仅导出某个方法
			
			new webpack.ProvidePlugin({
		      	_: 'loadsh',
		      	join:["loadsh","join"]
		    })
		   loadsh.join ==  _.join == join
		```
		
	* 解决导入全局变量的this问题  【有问题】
	
		```
		  一些传统的模块依赖的 this 指向的是 window 对象
		  当模块运行在 CommonJS环境下 this 为模块对象
		  重新指定this
		  
		  new webpack.ProvidePlugin({
		      	_: 'loadsh',
		      	join:["loadsh","join"]
		  })
		  loadsh.join ==  _.join == join
			
		
			loader:imports-loader
			{
         		test: require.resolve('index.js'),
        		use: 'imports-loader?this=>window'
        	}
			
		```
	* 导出常量

		```
		为不满足规范的文件导出属性
		
		publish.js
			
			const project = "DomeProject";
			const version = "1.0.0";
			const info = {
			    run: function () {
			        console.log(11111)
			    }
			}
			
		webpack
			{
	        test:require.resolve("./src/XXX/publish.js"),
	        use:"exports-loader?project,run=info.run"
	      }
		
		import { project,run } from "../publish/publishConst";
		```
* PWD 浏览器缓存
	
	[PWD](./Pwd.md)
	
* 请求代理 | 请求转发
	
	* DevServer 

		[所有参数](https://github.com/chimurai/http-proxy-middleware#options)
	
		```proxy
		devServer:{
			proxy:{将/api请求转发到xx上
				"/api":"http://www.x.com"
				fetch("/api/address.json")					==>fetch("http://www.x.com/api/address.json")
			}
			proxy:{
				changeOrigin: true//盗链问题
				"/api":{
					secure: false //https 加上
					target:"http://www.x.com",
					pathRewrite:{
						"^/api":"" //url 替换
					}
					f("/api/address.json")==>"www.a.com/address.json"
				}
			}
			proxy:{
				bypass:f(){
					拦截
				}
			}，
			proxy:{//转发多个
				content:["/api","/oldapi"],
				target: 'http://localhost:3000',
			}
		}
		
		```
* 单页面路由问题


	[connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback)
	
	```
	localhost:8080 ===> index.html
	
	localhost:8080/list ==> 浏览器会认为你在请求 /list路径   而不是localhost:8080的某个路由
	
	devServer:{
		historyApiFallback: true
		/list ==> 依然请求index.html  /list被当做路由的一部分 
	}
	
	
	线上：需要做路由对应转换配合
	
	```
	
	```
	react-router-dom 
		import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
			使用 BrowserRouter 作为总路由   
				:8286/login  
				:8286/home
			作为路由需要之上解决路由问题
	
		import {HashRouter as Router, Route, Switch} from 'react-router-dom'
			使用 HashRouter 作为总路由   
			:8286/#/login 
			:8286/#/home
			没有 之上解决路由问题
	```

* 多页面打包 

	```
	1:多入口
		entry:{
			app1:"../app1.js",
			app2:"../../app2.js"
		}				
	2:多个模板
		plugins:[
			new HtmlWebpackPlugin({
		      chunks: [
		      		"app1"
		      		,"runtime~name",指定runtime名字
		      		,"vendors",指定各个分包名字"[name]"
		      		。。。
		      	],
		      filename: "index-101.html",
		      title: "10.1活动",
		      template: path.join(__dirname, "index.html")
		    }),
		    new HtmlWebpackPlugin({
		      chunks: [
			      "app2"
			      ,"runtime~name",指定runtime名字
		      		,"vendors",指定各个分包名字"[name]"
		      		。。。
		      ],
		      filename: "index-815.html",
		      title: "index-815",
		      template: path.join(__dirname, "index.html")
		    }),
		]
	3:分包设置	
		optimization{
			runtimeChunk:",指定runtime名字",
			splitChunks:{
				cacheGroups:{
					vendors:{  //提起公共代码
						name:"vendors"//直接指定名称
					}
				}
			}
		}		
	```
* plugins
	
	* html-webpack-plugin

		```
		npm install --save-dev html-webpack-plugin
		
		var HtmlWebpackPlugin = require('html-webpack-plugin');
		plugins: [new HtmlWebpackPlugin()]
		
		打包完成后 自动创建html文件 并引入js文件
		配置
			https://github.com/jantimon/html-webpack-plugin#configuration
			
		```	
	* add-asset-html-webpack-plugin 
		
		```
		往 html-webpack-plugin生成的html 中 。增加内容
		```
	* clean-webpack-plugin  打包之前删除输入文件夹目录
		
		```
		npm install --save-dev clean-webpack-plugin

		const { CleanWebpackPlugin } = require('clean-webpack-plugin');
		
		[
			new CleanWebpackPlugin(),
			new CleanWebpackPlugin(["dist"]),
		]		
		```
	* css 和 js 分离  mini-css-extract-plugin 生产环境 不支持HMR
	* css 压缩 optimize-css-assets-webpack-plugin 生产环境
	* 压缩js  npm i -D uglifyjs-webpack-plugin
		* webpack4 --production 自动开启 
	* css-modules 和 引入全局样式和scss函数
	
		```
		安装scss		
		{
		  test: /\.scss$/,
		  use: [
		    {
		      loader:'style-loader'
		    }, {
		      loader: 'css-loader'
		    }, {
		      loader: 'sass-loader'
		    }, 
		    {
		      loader: 'sass-resources-loader',
		      options: {
		        resources: [
		        	//全局scss 样式路径
					path.join(""),
					path.join("")
		        ],
		      }
		    }
		  ]
		}
		```
		
* webpack配置合并
	
	```
 	 npm i -D webpack-merge
 	 webpack.common.js
 	 webpack.dev.js
 	 	module.exports = merger(webpack.common.js,webpack.dev.js)
 	 webpack.common.js
	```
		
* js 代码分割
	
	```
	代码分割和webpack无关。webpack 提供代码分割功能
	webpack.optimization.splitChunks
		开启代码分割
	
	import("loadsh").then(()=>{})
		异步代码会自动进行分割 (npm install --save-dev @babel/plugin-syntax-dynamic-import)
	```
* 代码分离 懒加载 Lazying | prefetch preload优化资源下载顺序

	```
	异步代码
	doSomeThing(){
		import("./a.js").then((a)=>{
			a.default.xxxxx
		})
	}
	打包的时候会被进行代码分割
	
	>
	
	preload 用于关键资源 优先下载
	prefetch 非优先 在空闲时间下载
	
	doSomeThing(){
		/* webpackChunkName: "print" */ 指定chunk名称
		/* webpackPrefetch: true */ 会在空闲时 在进行加载
		import(/* webpackPrefetch: true */ "./a.js").then((a)=>{
			a.default.xxxxx
		})
	}
	
	```
* bundle分析
	[Bundle Analysis](https://webpack.js.org/guides/code-splitting/#bundle-analysis)
	
	```
	npx webpack --profile --json > stats.json
	```
* webpack 和浏览器缓存
	
	```
	1:用户加载某段js 
	2:线上文件修改js
	3:用户刷新网页 会使用本地缓存 （名称一致导致）不会加载新的js
	
	解决
		output:{
			filename:'[name].[chunkhash].js',
			chunkfilename:'[name].[chunkhash].chunk.js'
		}
		
	runtimeChunk
		sas
	```
* 某些文件打包后 没有打包进去 （dome:css）
	
	```
	注意Tree Shaking
	
	publish.css
		body{
			padding:0,
			margin:0
		}
	导入之后webpack 发现没有用到。会默认Tree Shaking 省略掉
	```
* Cannot use [chunkhash] for chunk
* Cannot use [contenthash] for chunk
	
	```
	热更新不能和[contenthash | chunkhash]同时使用
	
	1： 如果是开发环境，将配置文件中的chunkhash 替换为hash
		
	2：如果是生产环境
		去掉热更新（插件 和 hot）
		可以使用[contenthash | chunkhash]
		chunkFilename
	```
* 异步代码修改 不更新为最新的

	```
	见  webpack 和浏览器缓存
	```
* 单独吧第三方库打包出

	```
	//受限  maxAsyncRequests  maxInitialRequests  设置
	//enforce 属性解除限制
	//如果是多页面打包 指定name 
	optimization.splitChunks.cacheGroups{
		vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          //name:"vendors"
          
        },
        react: {
          test: /[\\/]node_modules[\\/](react)/,
          priority: 0
           //name:"react"
           //enforce:true
        },
        rxjs: {
          test: /[\\/]node_modules[\\/](rxjs)/,
          priority: 0
          //name:"rxjs"
          //enforce:true
        },
		common: {
		 //name:"common"
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
	}
	```
		
* polyfills 引入
	
	* 开发应用 见babel useBuiltIns:"usage"会自动增加补偿文件 推荐
	* 开发应用 main.js 直接引入import 'babel-polyfill';    不推荐
	* 开发库  见 babel 编译JS

* Error: options/query provided without loader (use loader + options) 问题

	```
	{
		test:"",
		loader:"babel-loader",
		opions:{}
	}正确
	
	{
		test:"",
		use:[
			"babel-loader"
		],
		options{}
	}错误
	
	{
		test:"",
		use:[
			{
				loader:"babel-loader"
				options:{}
			}
		],	
	}正确
	```
	
* Error error：Support for the experimental syntax 'classProperties' isn't currently enable
* 类无法申明属性

	```
	class A(){
		name= "" //这句话报错
	}
	
	npm i -D @babel/plugin-proposal-class-properties
	
	.babelrc 或者 babel
	
	options:{
		plugins: ['@babel/plugin-proposal-class-properties']
	}
	```