const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuario.controller');

// Declaração das rotas dos usuários
// Recebe todos os usuários
router.get('/usuarios', usuarioController.findAll);

// Cria um novo usuário
router.post('/', usuarioController.create);

// Recebe um usuário pelo id
router.get('/:id', usuarioController.findOne);

// Atualiza um usuário pelo id
router.put('/:id', usuarioController.update);

// Deleta um usuário pelo id
router.delete('/:id', usuarioController.delete);

module.exports = router