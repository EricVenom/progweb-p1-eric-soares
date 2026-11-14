let pedidos = [];
let proximoId = 1;

export const pedidoModel = {
  listar() {
    return pedidos;
  },

  buscarPorId(id) {
    return pedidos.find((p) => p.id === id) ?? null;
  },

  existeCodigo(codigo) {
    return pedidos.some((p) => p.codigo === codigo);
  },

  inserir({ codigo, clienteId, status, observacao }) {
    const novo = {
      id: proximoId++,
      codigo,
      clienteId,
      status: status ?? 'ABERTO',
      observacao: observacao ?? null,
    };
    pedidos.push(novo);
    return novo;
  },

  atualizar(id, dados) {
    const i = pedidos.findIndex((p) => p.id === id);
    if (i === -1) return null;
    pedidos[i] = { ...pedidos[i], ...dados, id };
    return pedidos[i];
  },

  remover(id) {
    const antes = pedidos.length;
    pedidos = pedidos.filter((p) => p.id !== id);
    return pedidos.length < antes;
  },
};