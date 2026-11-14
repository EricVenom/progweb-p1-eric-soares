let itens = [];
let proximoId = 1;

export const itemPedidoModel = {
  listar() {
    return itens;
  },

  listarPorPedido(pedidoId) {
    return itens.filter((item) => item.pedidoId === pedidoId);
  },

  buscarPorId(id) {
    return itens.find((item) => item.id === id) ?? null;
  },

  inserir({ pedidoId, produto, tamanho, quantidade, precoUnitario }) {
    const novo = {
      id: proximoId++,
      pedidoId: Number(pedidoId),
      produto,
      tamanho,
      quantidade: Number(quantidade),
      precoUnitario: Number(precoUnitario),
    };
    itens.push(novo);
    return novo;
  },

  atualizar(id, dados) {
    const i = itens.findIndex((item) => item.id === id);
    if (i === -1) return null;
    itens[i] = { ...itens[i], ...dados, id };
    return itens[i];
  },

  remover(id) {
    const antes = itens.length;
    itens = itens.filter((item) => item.id !== id);
    return itens.length < antes;
  },
};