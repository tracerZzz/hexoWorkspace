```shell
wget https://luarocks.org/releases/luarocks-3.0.2.tar.gz
tar zxpf luarocks-3.0.2.tar.gz
cd luarocks-3.0.2
./configure --with-lua=/usr/local/openresty/luajit --with-lua-include=/usr/local/openresty/luajit/include/luajit-2.1/
make && make install
luarocks install luasocket
```

