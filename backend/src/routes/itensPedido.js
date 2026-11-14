import { Router } from 'express';
import { itemPedidoController } from '../controllers/itemPedidoController.js';

const router = Router();

router.get('/', itemPedidoController.listar);
router.get('/:id', itemPedidoController.buscarPorId);
router.post('/', itemPedidoController.criar);
router.put('/:id', itemPedidoController.atualizar);
router.delete('/:id', itemPedidoController.remover);

export default router;