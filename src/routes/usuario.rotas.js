const express = require('express')
const router = express.Router()
const userController = require('../controllers/usuario.controller');

// Recebe todos os usuários
router.get('/', userController.findAll);

// Cria um novo usuário
router.post('/', userController.create);

// Recebe um usuário pelo ID
router.get('/:id', userController.findOne);

// Atualiza 
router.put('/:id', userController.update);

// Delete a user with id
router.delete('/:id', userController.delete);

module.exports = router