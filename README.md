# FUI


拿到代码后运行

~~~
yarn install
yarn doc
~~~


就能在看到 doc 文件夹，里面有三个文件，一个 html 一个 js 一张图片，这三个文件就是我们的官网，简单吧。

部署前的doc配置
webpack.config.doc.js 配置入口和输出的html文件的名字
package.json中添加doc命令
因为配置tsconfig.json 里有outdir 配置所以输出了.d.ts文件， 所以修改config.doc.js中的output
然后到github仓库中 settings 设置 page
编写自动化 deploy 脚本

如 doc.sh
```
#!/bin/env bash
yarn doc
git checkout page  
mv doc/* ./
git add .
git commit -m"update"
git push
git checkout master
```


然后执行 sh ./doc.sh


一些知识点
 //跨状态的变量用useRef 不要用 useState