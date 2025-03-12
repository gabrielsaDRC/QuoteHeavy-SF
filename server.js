import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';

const app = express();
app.use(cors());

// Proxy middleware configuration
const salesforceProxy = createProxyMiddleware({
  target: 'https://unidas.my.salesforce.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove /api prefix when forwarding to Salesforce
  },
  onProxyReq: (proxyReq, req) => {
    // Copy the authorization header from the client request
    if (req.headers.authorization) {
      proxyReq.setHeader('Authorization', req.headers.authorization);
    }
  },
});

// Use the proxy for /api routes
app.use('/api', salesforceProxy);

// Create Vite server in middleware mode
const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'spa',
});

// Use vite's connect instance as middleware
app.use(vite.middlewares);

const port = 5173;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});