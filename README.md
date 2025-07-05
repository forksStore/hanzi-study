# 项目简介
- 儿童学习汉字, 学前教育, 小朋友学习汉字拼音, 通过小游戏闯关的方式学习汉字, 听音识字, 笔画书写
- 适合3~6岁小朋友学习汉字拼音, 笔画书写, 听音识字, 汉字小游戏闯关
- 支持学习加减法, 设置10以内还是100以内, 设置是否支持减法
- 支持平板端, 手机端, 电脑端
- 支持一键开启护眼模式(左上角绿叶)
- 家长可以按顶部标题10次可以自定义当前关卡进度, 方便多终端同步进度

# 运行方式

## 方式一：直接运行（原方式）
- 下载文件, 直接本地或者部署打开index.html即可, 都是离线资料

## 方式二：Docker部署（推荐）
### 使用Docker Compose（推荐）
```bash
# 克隆项目
git clone https://github.com/dhjz/hanzi-study.git
cd hanzi-study

# 启动容器
docker-compose up -d

# 访问应用
# 浏览器打开 http://localhost:8080
```

### 使用Docker直接构建
```bash
# 构建镜像
docker build -t hanzi-study .

# 运行容器
docker run -d -p 8080:80 --name hanzi-study-app hanzi-study

# 访问应用
# 浏览器打开 http://localhost:8080
```

### Docker命令说明
```bash
# 查看运行状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 重启服务
docker-compose restart
```

# 其他说明
- 页面效果图见`appimg`目录
- <img src="https://gcore.jsdelivr.net/gh/dhjz/hanzi-study@master/appimg/app1.jpg" style="width: 340px;"/>
- <img src="https://gcore.jsdelivr.net/gh/dhjz/hanzi-study@master/appimg/app2.jpg" style="width: 340px;"/>
- <img src="https://gcore.jsdelivr.net/gh/dhjz/hanzi-study@master/appimg/app3.jpg" style="width: 340px;"/>
- <img src="https://gcore.jsdelivr.net/gh/dhjz/hanzi-study@master/appimg/app4.jpg" style="width: 340px;"/>
- <img src="https://gcore.jsdelivr.net/gh/dhjz/hanzi-study@master/appimg/app5.jpg" style="width: 340px;"/>

- 项目地址: [https://github.com/dhjz/hanzi-study]( https://github.com/dhjz/hanzi-study)  
- 预览地址: [https://dhjz.github.io/hanzi-study/](https://dhjz.github.io/hanzi-study/)
