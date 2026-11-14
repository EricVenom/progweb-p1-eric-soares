import { pedidoService } from '../services/pedidoService.js';

export const pedidoController = {
  listar(req, res) {
    res.json(pedidoService.listar());
  },

  buscarPorId(req, res) {
    res.json(pedidoService.buscarPorId(Number(req.params.id)));
  },

  criar(req, res) {
    const novo = pedidoService.criar(req.body);
    res.status(201).json(novo);
  },

  atualizar(req, res) {
    res.json(pedidoService.atualizar(Number(req.params.id), req.body));
  },

  remover(req, res) {
    pedidoService.remover(Number(req.params.id));
    res.status(204).end();
  },
};