# http/1.0

## Keep-Alive

客户端通过包含`Connection: Keep-Alive`首部请求将一条连接保持在打开状态， 如果服务器包含湘潭的首部，表示服务端支持keep-alive，如果不包含，则在发回响应报文之后关闭链接

### 参数

1. timeout: 响应首部定义。它估计了故武器希望将链接保持在活跃状态的时间。
2. max: 响应首部定义。保持多少个链接为活跃状态。
3. 自定义: key[=value]格式，一般用于调试

```bash
Connection: Keep-Alive
Keep-Alive: max=1, timeout=120, name=qualc
```
