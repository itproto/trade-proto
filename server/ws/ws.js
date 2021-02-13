

const toMessage = (path, body, headers) => {
    return JSON.stringify({
        header: {
            path,
            ...headers
        },
        body
    })
};

const uuid = () => Math.random().toString(32).replace('.', '')

const wsend = (ws) => (path, body, pheaders = {}) => {
    const headers = {
        //  status: 200,
        //   method: 'GET',
        ...pheaders,
        respId: uuid()
    }
    const message = toMessage(path, body, headers);
    console.log(`lool`, [path, message])
    ws.send(message)
}

class MyRouter {
    map = { get: {}, post: {} }
    get = (path, cb) => {
        this.map.get[path] = cb;
        return this;
    }
    post = (path, cb) => {
        this.map.post[path] = cb;
        return this;
    }
}

const router = new MyRouter()
    .get('/foo', (req, res) => {
        res.broadcast({ broad: req.body })
        setInterval(() => {
            // res.send({ foo: 'bar' })
        }, 1000)
    })
    .get('/bar', (req, res) => {
        res.send({ foo: 'bar' })
    })

const getMessageHandler = (ws, wss) => (_data, flags) => {
    const data = JSON.parse(_data)
    if (data && data.header) {
        console.log('why')
        const method = (data.method || 'GET').toLowerCase();
        const { path, reqId } = data.header;
        const cb = router.map[method][path];
        const res = {
            status: (st) => {
                res._status = st
                return res;
            },
            send: (body) => wsend(ws)(path, body, { status: res._status, reqId }),
            broadcast: (body) => {
                console.warn(`aa`, Array.from(wss.clients).length)
                wss.clients.forEach((client) => {

                    if (client !== ws && client.readyState === 1) {
                        wsend(client)(path, body, { status: res._status, reqId });
                    }
                });
            }
        }

        if (!cb) {
            return res.status(404).send()
        }

        const req = {
            header: data.header,
            body: data.body,
            _ws: ws
        }
        cb(req, res)
    }
}

const getCloseHandler = (ws) => () => console.log('close')


const connectHandler = (wss, app) => (ws) => {
    wsend(ws)('/ping');
    ws.on('message', getMessageHandler(ws, wss));
    ws.on("close", getCloseHandler(ws));
}


// https://github.com/websockets/ws/blob/master/doc/ws.md
const createServer = (server, app) => {
    const wss = new (require("ws").Server)({ server });
    wss.on("connection", connectHandler(wss, app));
    return wss;
}

module.exports = createServer

