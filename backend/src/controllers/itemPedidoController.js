import { itemPedidoService } from '../services/itemPedidoService.js';

export const itemPedidoController = {
  listar(req, res) {
    res.json(itemPedidoService.listar(req.query.pedidoId));
  },

  buscarPorId(req, res) {
    res.json(itemPedidoService.buscarPorId(Number(req.params.id)));
  },

  criar(req, res) {
    const novo = itemPedidoService.criar(req.body);
    res.status(201).json(novo);
  },

  atualizar(req, res) {
    res.json(itemPedidoService.atualizar(Number(req.params.id), req.body));
  },

  remover(req, res) {
    itemPedidoService.remover(Number(req.params.id));
    res.status(204).end();
  },
};