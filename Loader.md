* Loader 处理不同的文件类型
	
	```
	{
		noParse:any,
		rules:[Rule]
	}
	```
	
	* Rule
	
		```
		{
			resourceQuery:/inline/ 【条件】
				json文件
				require("../a/b/regis.json?inline")
				
			test:   匹配文件 【条件】
			resource:匹配文件 【条件】
				二选一 [test, resource]
			exclude:排除【条件】
			include: 包含 【条件】
			and:必须匹配数组中的所有条件【条件】
			or :匹配数组中任何一个条件【条件】
			not:必须排除这个条件【条件】
			
			loader: (use:[{loader:"xxx"}])缩写
			use:[] | "" 指定loader
			oneOf:[Rule,{}] 适配规则 并使用某个loader
			
			parser:{} 
		}
		```
	* 【条件】
	
		```
		字符串：匹配输入必须以提供的字符串开始。是的。目录绝对路径或文件绝对路径。
		正则表达式：test 输入值。
		函数：调用输入的函数，必须返回一个真值(truthy value)以匹配。
		条件数组：至少一个匹配条件。
		对象：匹配所有属性。每个属性都有一个定义行为。
		```
	
* Loader
  
	* file-loader 用于处理file文件

		```
		test: /\.(woff|woff2|eot|ttf|otf)$/,
		test: /\.(png|svg|jpg|gif)$/,
		```
		
	* url-loader 作用和file-loader一致 提供了文件大小处理
		
		```
		
		图片无法加载问题
		  {
	        test: /.(gif|png|jpg)$/,
	        use: {
	          loader: "url-loader",
	          options: {
	            limit: 1024 * 20,
	            outputPath:"images/",
	            name:"[name]_[hash].[ext]"
	            //publicPath:"./build/images/"
	          }
	        }
	      }
	   打包之后
		   build
		   		images
		   			name.jpb
			
			index.html	   
	      		<img src="images/img/timg.8d70dae.jpg">   
	   	
	   	分析
	   		src 仅仅会指明在打包输出目录(build)之下的目录目录
	   		html 无法找到build目录
	   		
	   	指明 根目录
	   		Rule=>options =>publicPath (publicPath + ops.name ==>path)
	   		或者
	   		output=>publicPath:"./build/" (publicPath + ops.outputPath + ops.name =>path)
	      
		
		```
	* style-loader css-loader 样式文件处理 css
		
		```
		css-loader
			use:[
				'style-loader',
		    'css-loader',
		    'postcss-loader',
		    'sass-loader'

			]			
		
			options:{
				importLoaders:2
				//css-loader 作用于 @import 的资源之前 有几个loader
				/**
				 scss文件中存在@import xx.scss 
				 该导入如何处理 2=>标识在重新从 sass-loader再次编译
				 				1=>标识在重新从 postcss-loader再次编译
				 				
				 importLoaders =  [css.loaders].length - "css-loader".index -1
				 					4 - 1 - 1
				*/
				
				minimize:true
					是否压缩css
					
				modules:true
					开启css module功能
						cssName 会被编译码替代
						css样式会被隔离文件
						
					.imgA{
						background:red;
					}	
					
					import styles from "xx.css"
					
					img.classList.add(styles.imgA)
			}
		```
	* scss-loader

		```
		npm install sass-loader node-sass webpack --save-dev
		
		rules: [{
	      test: /\.scss$/,
	      use: [{
	          loader: "style-loader" // 将 JS 字符串生成为 style 节点
	      }, {
	          loader: "css-loader",
	          options:{
	          	
	          }
	      }, {
	          loader: "sass-loader" // 将 Sass 编译成 CSS
	      }]
    }]
		```
	
	* postcss-loader 对某些兼容性css样式 进行浏览器前缀添加
	
		```
		npm install -D postcss-loader autoprefixer 
		
		use:[
			{
				loader:"style-loader", //吧css挂在到页面
			},
			{
				loader:"css-loader"	 //处理css样式
			},
			{
				loader:"postcss-loader",
				options:{}<!--postcss.config.js 效果一致-->
			}
		]
		
 		postcss.config.js 新建 项目目录下
 			module.exports = {
			    plugins:[
			        require("autoprefixer")
			    ]
			}
 		
		```
	
	* mini-css-extract-plugin css和js进行分离
	
		```
		仅仅在生产环境使用
		替换 style-loader
			
		yarn add -D mini-css-extract-plugin
		const MiniCssExtractPlugin = require('mini-css-extract-plugin');
		
		module.exports = {
		  plugins: [
		    new MiniCssExtractPlugin({
		      // 类似 webpackOptions.output里面的配置 可以忽略
		      filename: '[name].css',
		      chunkFilename: '[id].css',
		    }),
		  ],
		  module: {
		    rules: [
		      {
		        test: /\.css$/,
		        use: [
		          {
		            loader: MiniCssExtractPlugin.loader,
		            options: {
		              // 这里可以指定一个 publicPath
		              // 默认使用 webpackOptions.output中的publicPath
		              publicPath: '../'
		            },
		          },
		          'css-loader',
		        ],
		      }
		    ]
		  }
		}
		```
	* typscript TS语法转js

		[ts-dome](./ts-dome.zip)

		```
		npm install --save webpack ts-loader
		npm install --save-dev typescript 
		
		```
		```ts.config

		{
		  "compilerOptions": {

		      "allowJs": true,
		      "jsx": "react",
		      "outDir": "./dist",
		      "sourceMap": false,
		      "noImplicitAny": false,
		      "module": "es6",//编译之后的标准
		      "target": "es6",//源文件标准 UMD amd es5 commonjs
		      "watch": true,
		      "types": [
		          "react","react-native"
		      ],
		      "skipLibCheck": true,
		      "moduleResolution":"node"
		  },
		  "include": [
		      "typings/**/*.d.ts",
		      "src/**/*.ts",
		      "src/**/*.tsx",
		      "*.tsx"
		  ],
		  "exclude": [
		      "node_modules"
		  ], 
		}
		```
		
		```webpack
		rules: [
	        {
	          test: /\.tsx?$/,
	          use: 'ts-loader',
	          exclude: /node_modules/
	        }
	      ]
      
		resolve: {
   		   extensions: [ '.tsx', '.ts', '.js' ]
	    },
		```
		
		
		
	* babel 编译JS  语法转换

		```
		npm install --save-dev babel-loader @babel/core //核心 和 桥梁
		npm install @babel-preset-env --save-dev //翻译规则
			//useBuiltIns:"usage" 会自动引入补偿文件
			
		rules: [
			{ 
				test: /\.js$/,
				exclude: /node_modules/, 
				
				use:"babel-loader"
				options:{}
				或者
				use:[
					{
						loader: "babel-loader",
						options:{ 
							presets:['@babel/preset-env'],
							presets: [["@babel/preset-env", {
								targets: {
									chrome: "67",
									ie: "11"
								}
								useBuiltIns: "usage",
								"corejs": 2, //npm install -D core-js@2
						}]],
					},{
						loader:"其他"
					}
				]
			 }
		]
		
		创建//.babelrc 替换 options进行配置
		
		浏览器兼容
			npm install --save @babel/polyfill //补偿文件
			import "@babel/polyfill"; //应用入口 导入补偿文件
				useBuiltIns:"usage"会自动增加补偿文件
				
		如果是业务代码项目
			options:{
				presets:[["@babel/preset-env"]{
					targets:[
					],
					useBuiltIns:"usage"
					}],
				
			}
		如果开发的是第三方库
			npm install --save-dev @babel/plugin-transform-runtime
			npm install --save @babel/runtime
			npm install --save @babel/runtime-corejs2
			options:{
			  "plugins": [
			    [
			      "@babel/plugin-transform-runtime",
			      {
			        "absoluteRuntime": false,
			        "corejs": 2,
			        "helpers": true,
			        "regenerator": true,
			        "useESModules": false
			      }
			    ]
			  ]