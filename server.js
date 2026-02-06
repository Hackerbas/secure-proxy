import express from 'express';
import { createServer } from 'node:http';
import * as WispServerNode from '@mercuryworkshop/wisp-js'; // Use the Star Import
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';

const app = express();
const server = createServer();
const port = 8080;

app.disable('x-powered-by');

app.use('/uv/', express.static(uvPath));
app.use(express.static('public'));

server.on('request', (req, res) => {
    app(req, res);
});

server.on('upgrade', (req, socket, head) => {
    if (req.url.endsWith('/wisp/')) {
        // Most versions of this lib use .wisp.routeRequest or just .routeRequest
        // This check ensures we hit the right function
        const router = WispServerNode.wisp || WispServerNode;
        router.routeRequest(req, socket, head);
    } else {
        socket.end();
    }
});

server.listen(port, () => {
    console.log(`🚀 Ultra-Secure Proxy live at http://localhost:${port}`);
});
