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
