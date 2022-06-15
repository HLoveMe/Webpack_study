
剥离依赖的第三方库，减少库的体积
================

针对开发组件库或者第三方工具库
--------

  * 开发的库依赖第三方库
  * 不想将第三方库打包进自己的库源码中，仅仅想做为外部依赖
  * 减少库的体积
  * 你的package.dependencies 包含这些库。 项目安装时，会自动下载这些库

```
externals:{
  'react',
  'rxjs',
  'rxjs/operators'
}
```

```
externals:{
  'react':'react',
  'rxjs':{
    root:'rxjs',
    commonjs2:'rxjs',
    amd:'rxjs',
    umd:'rxjs'
  },
  'rxjs/operators',
  'react-dom':'react-dom'

}
```