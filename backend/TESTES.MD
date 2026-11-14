# Testes da API — Projeto 1 (S3)

API: Loja de Roupas · entidades: Pedido e ItemPedido · servidor: `npm run dev` em http://localhost:3000

| # | Método | URL | Body | Status obtido | Observação |
|---|---|---|---|---|---|
| 1 | GET | / | — | 200 | Health check da API |
| 2 | POST | /pedidos | {"codigo":"PED-001","clienteId":1} | 201 | Criação de pedido com status padrão ABERTO |
| 3 | POST | /pedidos | {"codigo":"PED-001","clienteId":2} | 409 | Regra: código de pedido único |
| 4 | POST | /pedidos | {"codigo":"PED-003","clienteId":1,"status":"ENTREGUE"} | 400 | Regra: status fora da lista permitida |
| 5 | POST | /pedidos | {"clienteId":1} | 400 | Regra: campo obrigatório codigo ausente |
| 6 | GET | /pedidos/99 | — | 404 | Pedido inexistente |
| 7 | POST | /itens | {"pedidoId":1,"produto":"Camiseta Básica","tamanho":"M","quantidade":2,"precoUnitario":59.90} | 201 | Criação de item vinculado ao pedido 1 |
| 8 | POST | /itens | {"pedidoId":999,"produto":"Jaqueta","tamanho":"M","quantidade":1,"precoUnitario":220} | 422 | Regra 1:N: pedido informado não existe |
| 9 | POST | /itens | {"pedidoId":1,"produto":"Boné","tamanho":"XG","quantidade":1,"precoUnitario":45} | 400 | Regra: tamanho inválido |
| 10 | GET | /itens?pedidoId=1 | — | 200 | Filtro 1:N por pedidoId |
| 11 | PUT | /pedidos/1 | {"status":"PAGO"} | 200 | Atualização de status do pedido |
| 12 | DELETE | /itens/1 | — | 204 | Remoção de item |