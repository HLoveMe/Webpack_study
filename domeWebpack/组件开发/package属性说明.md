* main  (commonjs 预留的字段)
* module (es-module 预留的字段)
  ```
  import React from 'react'; 回导入main:指定的文件
  {
    main:'./index.js'，
    module:"./index.js"
  }
   你的项目被使用，并被webpack 或者rollup 打包时 会首选使用module字段，空则使用main
  ```

* files
  ```
  你的git 可能会包含很多测试文件或者dome

  npm i xx  
  仅仅拉取 files指定的文件或者目录
  {
    "files":[
      "index.js",
      "index.d.ts",
      "core",
      "dist/**/a.index.js"
    ]
  }
  ```
* exports 指定不同导入方式，不同的引用文件。和main互斥
  ```
  //=== main:'index.js'
  {
    "exports":{
      ".":{
        "types":"index.d.ts",
        "require":"index.js",// commonjs require('')
        "import":"index.js"// es import {} from '',
        "module":'index.js',// 作用同上 会替换。
        "import":{
          "node":"",
          "default":"index.js"
        }
        "node":'待定'
      }  
    }
  }
  ```
  ```
    多个文件导出
    import {} from 'rxjs'
    import {} from 'rxjs/operators'

    ├── operators/
    │   ├── index.js
    │   ├── index.d.ts
    │   ├──package-2.json
    ├── package.json
    └── index.js
    └── index.d.ts

    package.json
    {
      "exports":{
        "./package.json": "./package.json",// 必须
        ".":{
          "types":"index.d.ts",
          "require":"index.js",
          "import":"index.js"
        },
        "./operators":{
          "types": "./operators/index.d.ts", 
          "require": "./operators/index.js",//另： "../dist/aaa/bb/index.d.js"
          "import": "./operators/index.js"
        }
      }
    }


    package-2.json
    {
      "name":"rxjs/operators"
      "main": "./index.js",
      "module": "./index.js"
    }
    {
      // 可再次指定文件
      "name":"rxjs/operators"
      "main": "../dist/aaa/index.js",
      "module": "./dist/bbb/index.mjs"
    }
  ```