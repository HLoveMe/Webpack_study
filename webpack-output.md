打包输出
===================

```
output: {
    
    filename: 'js/[name].js', // 文件名称，可指定目录
    
    path: resolve(__dirname, 'build'),// 输出文件目录，将来所有资源输出的公共目录，所有资源都在此文件夹下
    
    publicPath: '/',// 所有资源引入时的公共前缀 img/a.jpg -> /img/a.jpg（用于生产环境）

    // 设置非入口chunk的名称（入口chunk就是entry配置的文件，
    // 通过import引入的文件就是非入口chunk）
    chunkFilename: 'js/[name]_chunk.js',
    
    library: '[name]',// 整个库向外暴露的变量名[一般结合DLL使用，将某个库全局暴露出去]
    
    libraryTarget: 'window' // 变量名添加到哪个上面（brower/node/commonjs）
}
```
* libraryTarget/library 不管何值，仅仅影响导出值如何赋值给导出变量
  ```
  export const a ={name:"zzh"}
  ```
  * 直接暴露给一个变量
    * libraryTarget: “var”
    ```
    打包后不会暴露任何值，导入该文件，仅仅执行该文件函数。
    类似：import '@babel/polyfills'; import 'metadata'
    {
      library: 'AAAA',
      libraryTarget: 'var',
    }
    var AAAA = {name:"zzh"};

    外部不能引用到AAAA
    ```
    * libraryTarget: assign
      ```
      会声明一个没有修饰符（let var const）的变量，会直接挂载到window上，会污染全局
      {
        libraryTarget: 'assign',
        library:'AAA',
      }
      AAAA = {name:"zzh"} // window.AAAA = {;
      ```
    * libraryTarget: “commonjs”

  * 暴露给一个对象的属性,会将暴露的属性挂载到 libraryTarget 上，
    * libraryTarget: “this”
      ```
      {
        libraryTarget: 'this',
      }
      // 该this取决于 谁执行了该模块
      this.a = {name:"zzh"}

      import A from 'aaa.js'
      // A.a={name:"zzh"}
      ```
      ```
        {
          libraryTarget: “this”
          library: 'AAAA',
        }
        this['AAAA'] = {a:{name:"zzh"}}

        import A from 'aaa.js'
        // A.AAAA.a={name:"zzh"}
      ```

    * libraryTarget: 'window'

      ```
        同上 仅仅将this 换为window
      ```
    * libraryTarget: 'global'
      ```
      同上 仅仅将this 换为 global(webpack 默认target 是 ‘web’ 所以默认是window。 如果是target: 'node' 则是global)
      ```
    * libraryTarget: 'commonjs'
      ```
        逻辑同 this，只是将 this 替换成 exports
      ```

  * 更符合模块定义系统
    * libraryTarget: 'amd'
    * libraryTarget:'commonjs2' 符合commonjs 模块定义
      ```
      {
        libraryTarget: 'commonjs2',
        library: 'AAAA',
      }
      module.exports.AAA = {a:{name:"zzh"}};
      ```
    * libraryTarget: 'umd'

      ```
      {
        libraryTarget: 'umd',
        library: 'AAA',
      }
      1：推荐的方式
      2：定义了兼容各种模块的执行函数
      (function webpackUniversalModuleDefinition(root, factory) {
      	if(typeof exports === 'object' && typeof module === 'object')
      		module.exports = factory();
      	else if(typeof define === 'function' && define.amd)
      		define([], factory);
      	else if(typeof exports === 'object')
      		exports["AAA"] = factory();
      	else
      		root["AAA"] = factory();
      })(self, () => {
        //..........
        return a
      });
      ```