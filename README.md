# 商品比价网站前端启动方式

## 1 仓库克隆

创建一个你想要放置本商品比价网站整体项目的文件夹，然后进入文件夹并且启动终端

```sh
git clone https://github.com/NoneZJL/BS-front.git
```

## 2 项目依赖配置及运行

如果你只有 npm 而没有安装 pnpm，请首先安装 pnpm

```sh
npm install -g pnpm
```

安装完 pnpm 之后就可以安装项目依赖

```sh
# 首先进入刚刚克隆的前端仓库
cd BS-front

# 然后就可以安装依赖
pnpm install
```

接着就可以启动项目

```sh
pnpm dev
```

此时项目就已经成功启动了，你可以打开本地浏览器来进行访问

```sh
http://localhost:5173/
```

到此为止，前端可以在本地环境中正常运行
