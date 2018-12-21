# base镜像
FROM ubuntu   
# 维护者信息
MAINTAINER quancongjin550@pingan.com.cn  

# 环境变量
ENV env_type PRD  

# 容器构建阶段执行的命令
RUN apt-get update  
RUN apt-get install -y nginx

# 添加文件
ADD . /home/data
# 提供独立于容器之外的持久化存储
# 将宿主机的目录映射到容器，并且保持文件跟新同步
VOLUME $PWD/node:/home/data

# 指定执行用户 和 默认工作目录
USER root
WORKDIR /home/data

# 设置容器启动后的第一个命令,每个Dockerfile中只能有一个 ENTRYPOINT 
ENTRYPOINT ["/usr/sbin/nginx","-g","daemon off;"]  
# 往往用于设置容器启动的第一个命令的默认参数, 可被 docker run <command>替换
CMD "this is default echo"
# 暴露端口
EXPOSE 80