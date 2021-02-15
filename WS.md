# Resources
https://github.com/websockets/ws#usage-examples

[] https://hpbn.co/websocket/
[] https://learning.oreilly.com/playlists/e9736caa-e54d-43e4-86a9-65a3eb93b93b/

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