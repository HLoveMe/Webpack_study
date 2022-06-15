webpack-output 配置 [Open](../../webpack-output.md)


webpack-externals 配置 [Open](../../webpack-externals.md)


webpack-babel 配置 [Open](https://github.com/HLoveMe/HTML_CSS_JS/blob/master/JS%E6%9F%90%E4%BA%9B%E7%9F%A5%E8%AF%86/babel.md)


打包方式
------

  * 直接将ts文件利用tsc 编译为兼容代码，或者js直接开发的代码 进行发布
    * 简单直接
    * 没有结果label 没有兼容各个浏览器的代码或者特性代码，依赖于使用者得项目进行polyfill补充和特性代码
    * 适用于内部项目的开发，不适用于线上发布。

  * 通过webpack + babel 进行编译，补充 压缩，打包为一个文件 在进行发布
    * 需要理解babel 和webpack
    * 直接补充polyfill 和特性代码 无需对外依赖
    * 可以兼容各种执行环境
    * 线上发布