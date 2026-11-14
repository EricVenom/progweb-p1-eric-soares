import { pedidoModel } from '../models/pedidoModel.js';
import { erro } from '../utils/erro.js';

const STATUS_VALIDOS = ['ABERTO', 'PAGO', 'CANCELADO'];

export const pedidoService = {
  listar() {
    return pedidoModel.listar();
  },

  buscarPorId(id) {
    const pedido = pedidoModel.buscarPorId(id);
    if (!pedido) throw erro(404, 'Pedido não encontrado');
    return pedido;
  },

  criar({ codigo, clienteId, status, observacao } = {}) {
    if (!codigo || !clienteId) {
      throw erro(400, 'Campos "codigo" e "clienteId" são obrigatórios');
    }
    if (pedidoModel.existeCodigo(codigo)) {
      throw erro(409, 'Já existe um pedido cadastrado com este código');
    }
    if (status && !STATUS_VALIDOS.includes(status)) {
      throw erro(400, `Status inválido. Use um de: ${STATUS_VALIDOS.join(', ')}`);
    }

    return pedidoModel.inserir({ codigo, clienteId, status, observacao });
  },

  atualizar(id, dados = {}) {
    if (dados.status && !STATUS_VALIDOS.includes(dados.status)) {
      throw erro(400, `Status inválido. Use um de: ${STATUS_VALIDOS.join(', ')}`);
    }
    const atualizado = pedidoModel.atualizar(id, dados);
    if (!atualizado) throw erro(404, 'Pedido não encontrado');
    return atualizado;
  },

  remover(id) {
    const removido = pedidoModel.remover(id);
    if (!removido) throw erro(404, 'Pedido não encontrado');
  },
};