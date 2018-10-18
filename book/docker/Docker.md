
# Docker

## docker command

```js {.line-numbers}
docker xxx --help
docker run --help
```

### 1. docker pull

```js {.line-numbers}
#!/bin/bash
docker pull node[:Version[default latest]]

# all tagged
docker pull -a node
```

### 2. docker build

```js {.line-numbers}
docker build -t docke_file .
```

* -t 镜像名字，不能有大写
    -t 设置一个存在的镜像名称时，原先的镜像名称会被剥夺，就成为了一个无名镜像，也就是`none`
* -f 指定dockerfile文件 默认Dockerfile

### 3. docker run

```js {.line-numbers}
docker run -p 8080:80 -d nginx
```

* -p 端口映射
* -d 后台运行
* --name 定义容器名称

>更多命令见[docker run](http://www.runoob.com/docker/docker-run-command.html)

### 4. docker ps

```js {.line-numbers}
docker ps

# Don‘t truncate output IDs
docker ps --no-trunc

# show all containers
docker ps -a

# display total file sizes
docker ps -s

# show the latest created container
docker ps -l

# show n last created containers
docker ps -n 2

# only display numeric IDs
docker ps -q

# filter output based on conditions provided (default [])
docker ps -f key:value

# 搭配-a 显示出对应退出码的
docker ps -a -f exited =0
docker ps -f id=*containerId*
docker ps -f name=containerName*
docker ps -f status=*[created|restarting|running|paused|exited]

# -指定id之前 运行中的容器
docker ps -f before=[containerId|containerName]

# -指定id之后 运行中的容器
docker ps -f since=[containerId|containerName]
docker ps -a -f ancestor=[image-name[:tag]]
dockerps -a -f ancestor=[image-id]
# 创建网络mynet
# docker network create -d bridge --subnet 172.25.0.0/16 mynet
dockerps -f network=mynet
docker ps --format "{{.ID}}:{{.Command}} -: {{.Image}}"
```

#### --format

* .ID 容器ID
* .Image 镜像ID
* .Command Quoted command
* .CreatedAt 创建容器的时间点.
* .RunningFor 从容器创建到现在过去的时间.
* .Ports 暴露的端口.
* .Status 容器状态.
* .Size 容器占用硬盘大小.
* .Names 容器名称.
* .Labels 容器所有的标签.
* .Label 指定label的值 例如'{{.Label "com.docker.swarm.cpu"}}'
* .Mounts 挂载到这个容器的数据卷名称

### 5. docker images

```js {.line-numbers}
docker images -a -q --no-trunc --digests --format'{{.ID}}' -f before=containerId
# --digests 显示摘要

```

### 6. docker stop/start/kill/restart

```js {.line-numbers}
docker start containerName[ containerId [...] ]
docker stop containerName[ containerId [...] ]
docker kill containerName[ containerId [...] ]
docker restart containerName[ containerId [...] ]
```

### 7. docker cp

```js {.line-numbers}
docker cp file containerId://usr/share/nginx/html
```

### 8. docker commit

```js {.line-numbers}
docker cp index.html containerId://usr/share/nginx/html
docker commit -m 'message' containerId imagesName
```

不执行commit，容器内容改动后stop容器，在启动容器之后，改动的内容不会保存，所以需要commit

* -a :提交的镜像作者
* -c :使用Dockerfile指令来创建镜像
* -m :提交时的说明文字
* -p :在commit时，将容器暂停

### 9. remove container/images

```js {.line-numbers}
# stop container
docker stop container_id

# stop all container
docker stop $(docker ps -a -q )

# delete container
docker rm container_id

# delete all container
docker rm $(docker ps -a -q )

# delete images
docker rmi image_id

# delete all image
docker rmi -f $(docker images -q )
```

### 10. docker logs

```js {.line-numbers}
docker logs -t -f CONTAINER
```

* -f :跟踪日志输出
* --since :显示某个开始时间的所有日志
* -t :显示时间戳
* --tail :仅列出最新N条容器日志

### 11. docker inspect

获取容器、镜像的元数据

```js {.line-numbers}
docker inspect CONTAINER|IMAGES
```

## Dockerfile

```js {.line-numbers}
# Dockerfile
From ubuntu
MAINTAINER quancongjin550@pingan.com.cn
ENV env_type PRD
RUN apt-get update
RUN apt-get
install -y nginx
ENTRYPOINT ["/usr/sbin/nginx","-g","daemon off;"]
EXPOSE 80
```

[Dockerfile中ENTRYPOINT 和 CMD的区别](https://blog.csdn.net/allocator/article/details/70490218)
[Dockerfile命令详解(超全版本)](https://www.cnblogs.com/dazhoushuoceshi/p/7066041.html)

### 1. From

基础镜像

### 2. MAINTAINER

维护者信息

### 3. RUN

构件容器时就运行的命令以及提交运行结果,比如安装环境依赖

```js {.line-numbers} RUN
apt-get update
```

### 4. CMD

容器启动时执行的命令,docker run命令如果指定了参数会把CMD里的参数覆盖<
CMD在容器运行的时候提供一些命令及参数，用法如下：

```js {.line-numbers}
CMD ["echo", "this is cmd", "command"]
CMD ["this is cmd", "command"]
CMD echo "this is cmd command"
第一种用法：运行一个可执行的文件并提供参数
第二种用法：为ENTRYPOINT指定参数
第三种用法(shell form)：是以”/bin/sh -c”的方法执行的命令
```

```js {.line-numbers} CMD
echo this is cmd command
#-----

$: docker run qualc/dockerfile
# > this is a echo test

$: docker run qualc/dockerfile3 /bin/echo 'this is cmd command line'
# > this is cmd command line
```

### 5. ENTRYPOINT

容器启动时的默认命令,每个Dockerfile中只能有一个 ENTRYPOINT ，当指定多个时，只有最后一个起效,指定后，命令后参数失效。

[论docker中 CMD 与 ENTRYPOINT 的区别](https://blog.csdn.net/abc8286946/article/details/41380539)

```js {.line-numbers}
写法一：ENTRYPOINT ["echo", "this is cmd", "command"]

写法二：ENTRYPOINT echo "this is cmd command"
```

```js {.line-numbers} ENTRYPOINT
["/bin/echo", "this is entrypoint"]
#-----

$: docker run qualc/dockerfile3
# > this is entrypoint

ENTRYPOINT ["/bin/echo", "this is entrypoint"]
CMD ["cmd command"]
#-----

$: docker run qualc/dockerfile3
# > this is entrypoint cmd command

$: docker run qualc/dockerfile3
'line'
# > this is entrypoint line

$: docker run qualc/dockerfile3 /bin/echo
'test'
# > this is entrypoint /bin/echo test
```

常用搭配: ENTRYPOINT指定固定命令和参数， CMD指定默认但会改的参数

```js {.line-numbers}
ENTRYPOINT ["ls"]
CMD ["-l"]
```

### 6.EXPOSE

暴露端口,对外提供容器端口

```js {.line-numbers}
EXPOSE 80 EXPOSE 81 EXPOSE 8080
```

### 7. ADD

够将构建命令所在的主机本地的文件或目录、远程URL资源、压缩包(tar,gzip,bzip2,etc)复制到镜像文件系统
如果url需要认证，则使用`RUN wget`或者`RUN curl`代替

```js {.line-numbers}
ADD ["index.html", "/var/www/html"]
ADD index.html /var/www/html
```

### 8. COPY

将构建命令所在的主机本地的文件或目录，复制到镜像文件系统。

```js {.line-numbers}
COPY ["index.html", "/var/www/html"]
COPY index.html /var/www/html
```

### 9. VOLUME

提供独立于容器之外的持久化存储，通常用作挂载数据库文件、代码库、或者容器所创建的文件/目录等可变的文件， 挂载完成后，挂载目录可与容器目录内容实时更新匹配

* 挂在宿主机目录

```js {.line-numbers}
docker run -d --name nginxVolume -v /usr/share/nginx/html nginx docker inspect nginxVolume

# >...
# >Mounts:[
# > "Source": "/var/lib/docker/volumes/fe9a4f52d5649b55cd05979b78857b6c40c6a2cd3555cf2294dbc154d793d50e/_data", //宿主机地址
# > "Destination": "/usr/share/nginx/html", // 容器地址
# >]

# 进入宿主机环境
screen ~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux/tty
```

* 挂在本地目录

```js {.line-numbers}
docker run -p 80:80 -d -v $PWD/html:/var/www/html qualc/dockerfile3
```

* 挂载到其他容器

```js {.line-numbers}
docker create -v $PWD/data:/var/mydata --name volumedatademo ubuntu
docker run -it --volumes-from volumedatademo ubuntu /bin/bash
#-----

$: mount
# > ...
# > osxfs on /var/mydata
# > ...
```

### 10. USER

指定运行用户

```js {.line-numbers}
RUN useradd -d /home/docker -m docker
RUN echo 'docker:Paic1234' | chpasswd
user docker
```

### 11. WORKDIR

指定工作目录, 可以配置多个WORKDIR

```js {.line-numbers}
WORKDIR /home/docker
CMD pwd
#-----

# > /home/docker


WORKDIR /home/docker
WORKDIR /html
CMD pwd
#-----

# > /html


WORKDIR /home/docker
WORKDIR html
CMD pwd
#-----

# > /home/docker/html
```

### 12. ONBUILD

触发器，创建基础镜像是使用，当一个新的镜像基于这个镜像构建时出发。

```js {.line-numbers}
FROM ubuntu
MAINTAINER base
images onbuild
cmd echo base images
#-----

$: docker build -t qualc/onbuildimage .


from qualc/onbuildimage
maintainer child build images
#-----

$: docker build -t qualc/onbuildimagechild .
$: docker run qualc/onbuildimagechild

# > Step 1 : FROM qualc/onbuildimage
# > Executing 1 build trigger...
# > ...
# > base images
```

### 13. ENV

设置环境变量

```js {.line-numbers}
ENV type PRD
ENV projectName website
ENV projectVersion 1.0
```

## Registry

### 1. 常用命令

```js {.line-numbers}
# 搜索镜像
docker search containe

# 拉去镜像
docker pull container

# 推送镜像
docker push container

# 重命名镜像
docker tag container newContainer
```

```js {.line-numbers}
$: docker search whalesay
#-----

# > NAME DESCRIPTION STARS OFFICIAL AUTOMATED
# > docker/whalesay 描述 8564 来自hub AUTOMATED

$: docker run docker/whalesay cowsay Docker很好玩!

# > __________________
# > &lt; Docker很好玩! >
# > ------------------
# > \
# > \
# > \
# > ## .
# > ## ## ## ==
# > ## ## ## ## ===
# > /""""""""""""""""___/ ===
# > ~~~ {~~ ~~~~ ~~~ ~~~~ ~~ ~ / ===-
# > \______ o __/
# > \ \ __/
# > \____\______/


# 产生一个名字不一样，内容一样的的images
$: docker tag docker/whalesay qualc/whalesay

# 推送
$: docker push qualc/whalesay
```

## docker-compose

* Mac/Windows: 自带
* Linux: curl `https://github.com/docker/compose/releases`

[daocloud](http://get.daocloud.io/)

### 1. 安装

* Ubuntu安装为例子

```js {.line-numbers}
# 安装docker
apt-get update
apt-get
install docker.io

# 添加用户到组
groupadd docker gpasswd -a
${USER} docker
service docker restart

# 验证
docker images

# 安装docker compose
sudo curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-'uname -s'-'uname -m' -o /usr/local/bin/docker-compose

# 给所有用户设置执行权限
chmod +x /usr/local/bin/docker-compose
```

[九个uname命令获取Linux系统详情的实例](https://blog.csdn.net/fngsong/article/details/17147279)
[Linux新手入门：通过chmod改变文件权限](https://blog.csdn.net/wuwenxiang91322/article/details/9259877)

不添加用户到docker用户，每次执行都需要加sudo，否则报`FATA[0000] Get http:///var/run/docker.sock/v1.18/images/json: dial unix /var/run/docker.sock: permission denied. Are you trying to connect to a TLS-enabled daemon without TLS?`

### 2. 命令

```js {.line-numbers}
# 编译
docker-compose build

# 启动
docker-compose up

# 后台启动
docker-compose up -d

# 编译后启动
docker-compose up --build

# 停止compose进程组
docker-compose stop

# 删除compose进程组
docker-compose rm
```

[Docker-compose命令详解](Docker-compose%E5%91%BD%E4%BB%A4%E8%AF%A6%E8%A7%A3)

### 3. docker-compose.yml

```js {.line-numbers}
$: vi docker-compose.yml
# -----
version: '2' # 表示使用哪个compose版本的语法
networks:
    ghost: # 定义网络

services:
    node: # 应用名称
        build: node # 编译
        networks:
            - ghost
        ports: # 映射端口
            - 3000:3000

    nginx:
        build: nginx
        networks:
            - ghost
        depends_on:
            - node
        ports:
            - 80:80
```

### 4. 案例

node

```js {.line-numbers}
$: mkdir node nginx data
$: cd ghost touch Dockerfile config.js
$: vi Dockerfile

# -----
from node copy index.js / workdir / cmd ["node", "index.js"]
# -----

$: vi index.js

# -----
var http = require('http');
http.createServer( function(request, response) {
    response.writeHead(200,{'Content-Type':'text-plain'});
    response.end('Hello World\n');
}).listen(3000);
# -----
```

nginx

```js {.line-numbers}
$: cd .. && mkdir nginx &&cd nginx &&  touch Dockerfile config.js $: vi Dockerfile

# -----
from nginx copy nginx.conf /etc/nginx/nginx.conf expose 80
# -----

$: vi nginx.conf

# -----
worker_processes 4;
events {
    worker_connections 1024;
}
http {
    upstream ghostapp {
        server node:300;
    }
    server {
        listen 80;
        location / {
            proxy_pass http://ghostapp;
        }
    }
}
# -----
```

```js {.line-numbers}
$: docker-compose up -d

# > ghost_db_1 is up-to-date
# > Starting ghost_ghost-app_1
# > Starting ghost_nginx_1
```

浏览器输入`http://localhost`即可访问

## 网络模式

```bash{.line-numbers}
docker run -it --net=bridge ubuntu /bin/bash
```

* bridge模式：使用–net =bridge指定，默认设置
* host模式：使用–net =host指定
* none模式：使用–net =none指定
* container模式：使用–net =container:NAMEorID指定

[一分钟看懂Docker的网络模式和跨主机通信](https://www.cnblogs.com/yy-cxd/p/6553624.html)
[Docker的四种网络模式](https://blog.csdn.net/huanongying123/article/details/73556634)
