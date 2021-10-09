const User = require('../models/usuario.model');

// Recebe e retorna todos os usuários da base de dados
exports.findAll = (req, res) => {
    User.find()
        .then(usuarios => {
            res.send(usuarios);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Algo deu errado durante a busca pelos usuários..."
            });
        });
};

// Cria e salva um usuário novo, recebendo do corpo da requisição enviada pelo usuário as informações
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Por favor, preencha todos os campos necessários!"
        });
    }

    // Instancia um novo usuário e preenche as informações vindas do corpo da requisição 
    const user = new User({
        primeiroNome: req.body.primeiroNome,
        ultimoNome: req.body.ultimoNome,
        email: req.body.email,
        senha: req.body.senha
    });

    // Chama o .save() para gravar o usuário instanciado na base de dados
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Algo deu errado na criação de um novo usuário..."
            });
        });
};

// Busca por um usuário específico, utilizando como parâmetro o id recebido do corpo da requisição
exports.findOne = (req, res) => {
    User.findById(req.params.id)
        .then(usuario => {
            if (!usuario) {
                return res.status(404).send({
                    message: "Usuário não encontrado para o id: " + req.params.id
                });
            }
            res.send(usuario);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Usuário não encontrado para o id: " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Erro na busca pelo id: " + req.params.id
            });
        });
};

// Atualiza um usuário através do id enviado no corpo da requisição
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Por favor, preencha todos os campos necessários!"
        });
    }

    // Método que busca e atualiza o usuário pelo id da requisição
    User.findByIdAndUpdate(req.params.id, {
        primeiroNome: req.body.primeiroNome,
        ultimoNome: req.body.ultimoNome,
        email: req.body.email,
        phone: req.body.phone
    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "Usuário não encontrado para o id: " + req.params.id
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Usuário não encontrado para o id: " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Erro ao atualizar usuário para o id: " + req.params.id
            });
        });
};

// Encontra e deleta o usuário pelo id dos parâmetros da requisição


exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "Usuário não encontrado para o id: " + req.params.id
                });
            }
            res.send({ message: "Usuário deletado com sucesso!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Usuário não encontrado para o id: " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Não foi possível deletar o usuário com o id: " + req.params.id
            });
        });
};