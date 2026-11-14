import express from 'express';
import pedidosRouter from './routes/pedidos.js';
import itensPedidoRouter from './routes/itensPedido.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// --- Middleware global (antes das rotas) ---
app.use(express.json());
app.use(logger);

// --- Health check ---
app.get('/', (req, res) => {
  res.json({
    api: 'Loja de Roupas API',
    versao: '1.0.0',
    rotas: ['/pedidos', '/itens'],
  });
});

// --- Rotas ---
app.use('/pedidos', pedidosRouter);
app.use('/itens', itensPedidoRouter);

// --- 404 para rotas que não existem ---
app.use((req, res) => {
  res.status(404).json({ erro: `Rota ${req.method} ${req.url} não existe` });
});

// --- Tratador de erro: SEMPRE o último ---
app.use(errorHandler);

export default app;