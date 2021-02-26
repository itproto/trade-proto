# Resources
https://github.com/websockets/ws#usage-examples

[] https://hpbn.co/websocket/
[] https://learning.oreilly.com/playlists/e9736caa-e54d-43e4-86a9-65a3eb93b93b/

## Params
- by URL
- Full dup
- Tex/bin
- message boundaries

> with WS multi-byte message arrives in-whole and in-order

## What it adds
- binary/text
- same-origin enforce
- negotiation/framing
- interop with HTTP

## Missing(CUSTOM):
- state management
- compress
- caching

## API
- new WS - opens connection
- onopen|onerror|onclos
### onmessage
    - `msg.data instaceor Blob|ArrayBuffer|UTF-8DOMString`
    - no streaming, when 1Mb data onmessage will be called once with entire message
    - message is auto-converted to DOMString or Blob
    - `ws.binaryType= "arraybufer"` - instead of blob
When Blob
 - (IMMUT)no need to modify/slice data - image
 - ArrayBuffer - when additional processing, streaming inside browser

## what `sock.io` adds
 - multitrans-fallback
 - heartbeats
 - timeouts
 - auto-reconnect

## SEND
```js
  // UTF-encoded
  socket.send("Hello server!"); 
  socket.send(JSON.stringify({'msg': 'payload'})); 

  // arrayBuf as binary
  var buffer = new ArrayBuffer(128);
  socket.send(buffer); 
  // arrayBufView as binary
  var intview = new Uint32Array(buffer);
  socket.send(intview); 
  // blob as binary
  var blob = new Blob([buffer]);
  socket.send(blob); 
  ```
- send returns fast, but content not send yet `Haed -of-line` blocking
```js
ws.onopen = function () {
  subscribeToApplicationUpdates((evt) { 
    if (ws.bufferedAmount == 0) 
      ws.send(evt.data); 
  });
```

## MessageTypes:
- 0 Text
- 2 Binary
- 8 Close
- 9/10 ping/pong

## Low level session
```
GET /echo HTTP/1.1
Host: echo.websocket.org
Origin:http://www.websocket.org
Sec-WebSocket-Key: 7+C600xYybOv2zmJ69RQsw==
Sec-WebSocket-Version: 13
Upgrade: websocket
<==========
101 Switching Protocols
Connection: Upgrade
Date: Wed, 20 Jun 2012 03:39:49 GMT
Sec-WebSocket-Accept: fYoqiH14DgI+5ylEMwM2sOLzOi0=
Server: Kaazing Gateway
Upgrade: WebSocket
```


One-line curl
```sh
 curl -i -N \
  -H "Connection: Upgrade" \
  -H "Upgrade: websocket" \
  -H "Host: echo.websocket.org" \
  -H "Origin: http://www.websocket.org" \
  http://echo.websocket.org
 ```

# Sample app
https://trading-terminal.tradingview.com/
 
 # FINANCE
 https://polygon.io/docs/getting-started

 - https://dev.to/midassss/real-time-financial-data-streaming-using-websockets-4phb

 # Tools
 https://www.npmjs.com/package/wscat