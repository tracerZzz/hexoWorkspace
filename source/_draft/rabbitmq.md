### rabbitmq

#### mac安装

```shell
brew install rabbitmq
./sbin/rabbitmq-server
./sbin/rabbitmq-server -detached 后台启动
```

启动rabbitmq web服务：

```shell
rabbitmq-plugins enable rabbitmq_management
```
增加一个用户

```shell
sudo rabbitmqctl add_user admin admin
```

设置该用户为administrator角色：

```shell
sudo rabbitmqctl set_user_tags admin administrator
```


设置权限：

```shell
sudo rabbitmqctl  set_permissions  -p  '/'  admin '.' '.' '.'
```

之后就能用admin用户远程连接rabbitmq server了。

#### docker

```shell
docker pull rabbitmq
```

```shell
docker run -d -p 5672:5672 -p  15672:15672 rabbitmq:3.7.8-management
```



36.111.140.165

guest

NofyRaYrHuGmjO2i



张双双 producer 2&5hGFRQD6uSVHJD    management
张展展 consumer Wel*g4C!y1rCprQp      management

