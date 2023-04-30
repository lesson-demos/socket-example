# Socket example

## Instalation

both `npm i socket.io` and `npm i socket.io-client` are necessary; for the server and client side repectively.

## in `server.js`

- line 6: The socket connection needs an http server to establish the http long polling connection (this type of connection allows client's and servers to arbitrarily push messages to each other as opposed to normal http connections which have a strict request reqsponse paradigm).
- line 7: The socket.io library needs some configuration. Here I'm telling it that it will receive messages from clients with a different origin (to prevent CORS errors). I'm doing this because our webpack dev server is serving the web app on port 4000, and our socket server is listening on port 4002
- line 17-26: Establishing the event listeners our sockets (on the server side) should listen for. I have a pretty lame one for if/when the connection is disconnect, but I also have a listener for a custom "greet" event. I attach these listeners inside the callback of the "connection" event because prior to that event there is no client to attach listeners to.
- line 20: emitting events only sends messages to a single client, but the server (the nexus of our socket connections) has the special ability to send messages to all our clients. This is done with broadcasting, which is what this line does. When a user emits a "greet" message the server then broadcasts a "greet" message to all clients attached to it (excluding the original publisher of the message because otherwise you'd end up in some infinite loops pretty easily)

## in `App.jsx`

- line 9-26: I'm establishing this socket connection in an on-mount useEffect (meaning once and only once whent he component mounts). Similarly to the backend, im establishing my event listeners here. If this app were larger I would move this logic into a context because I want to make sure I'm only ever establishing ONE socket connection at once. Also, it makes sense that the event listeners on the socket connection would update application state that I probably would want in context(s) as well.
- line 25: I'm storing the socket client on state so I can emit events with it whenever/wherever I want/need.
- line 32: I'm using the socket connection to emit an event to my server. My two arguments are the type of the event I'm emitting, and the payload of that event respectively. The payload can be literally whatever I want (as long as it's serializable).