# 0. 构建
docker build . -t mystonks-dao-client:v0.1
docker save -o client.tar mystonks-dao-client:v0.1

# 1. client.tar 传到服务器上

# 2.服务器上执行以下命令
# docker load -i client.tar
# docker run -d -p 8080:80 mystonks-dao-client:v0.1