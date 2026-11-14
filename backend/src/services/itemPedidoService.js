import { itemPedidoModel } from '../models/itemPedidoModel.js';
import { pedidoModel } from '../models/pedidoModel.js';
import { erro } from '../utils/erro.js';

const TAMANHOS_VALIDOS = ['PP', 'P', 'M', 'G', 'GG'];

export const itemPedidoService = {
  listar(pedidoId) {
    if (pedidoId) return itemPedidoModel.listarPorPedido(Number(pedidoId));
    return itemPedidoModel.listar();
  },

  buscarPorId(id) {
    const item = itemPedidoModel.buscarPorId(id);
    if (!item) throw erro(404, 'Item do pedido não encontrado');
    return item;
  },

  criar({ pedidoId, produto, tamanho, quantidade, precoUnitario } = {}) {
    if (!pedidoId || !produto || !tamanho || quantidade === undefined || precoUnitario === undefined) {
      throw erro(400, 'Campos "pedidoId", "produto", "tamanho", "quantidade" e "precoUnitario" são obrigatórios');
    }
    if (!TAMANHOS_VALIDOS.includes(tamanho)) {
      throw erro(400, `Tamanho inválido. Use um de: ${TAMANHOS_VALIDOS.join(', ')}`);
    }
    if (Number(quantidade) <= 0 || Number(precoUnitario) <= 0) {
      throw erro(400, 'Quantidade e preço unitário devem ser maiores que zero');
    }
    // Regra 1:N: o pedido pai precisa existir (422)
    if (!pedidoModel.buscarPorId(Number(pedidoId))) {
      throw erro(422, 'Pedido informado não existe');
    }

    return itemPedidoModel.inserir({ pedidoId, produto, tamanho, quantidade, precoUnitario });
  },

  atualizar(id, dados = {}) {
    if (dados.tamanho && !TAMANHOS_VALIDOS.includes(dados.tamanho)) {
      throw erro(400, `Tamanho inválido. Use um de: ${TAMANHOS_VALIDOS.join(', ')}`);
    }
    if (dados.quantidade !== undefined && Number(dados.quantidade) <= 0) {
      throw erro(400, 'Quantidade deve ser maior que zero');
    }
    const atualizado = itemPedidoModel.atualizar(id, dados);
    if (!atualizado) throw erro(404, 'Item do pedido não encontrado');
    return atualizado;
  },

  remover(id) {
    const removido = itemPedidoModel.remover(id);
    if (!removido) throw erro(404, 'Item do pedido não encontrado');
  },
};