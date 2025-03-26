const express = require('express');
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const path = require('path');
const { check, validationResult } = require('express-validator');

const app = express();
const port = 3001;
const saltRounds = 10;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "db_usuarios",
});

app.use(express.json()); 

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST']
}));


app.post("/Cadastro", [
    check("email").isEmail().withMessage("Email inválido"),
    check("password").isLength({ min: 6 }).withMessage("A senha deve ter no mínimo 6 caracteres")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, result) => {
        if (err) {
            console.error("Erro ao buscar usuário:", err);
            return res.status(500).send({ msg: "Erro interno no servidor" });
        }

        if (result.length > 0) {
            return res.status(400).send({ msg: "Usuário já cadastrado" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        db.query(
            "INSERT INTO usuarios (email, password) VALUES (?, ?)",
            [email, hashedPassword],
            (err) => {
                if (err) {
                    console.error("Erro ao cadastrar usuário:", err);
                    return res.status(500).send({ msg: "Erro ao cadastrar usuário" });
                }
                res.status(201).send({ msg: "Cadastrado com sucesso" });
            }
        );
    });
});

app.post("/Login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, result) => {
        if (err) {
            console.error("Erro ao buscar usuário:", err);
            return res.status(500).send({ msg: "Erro interno no servidor" });
        }

        if (result.length === 0) {
            return res.status(400).send({ msg: "Email não cadastrado" });
        }

        const user = result[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            res.status(200).send({ msg: "Usuário logado com sucesso" });
        } else {
            res.status(401).send({ msg: "Senha incorreta" });
        }
    });
});

app.post('/ForgotPassword', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send({ msg: "O email é obrigatório" });
    }
    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error("Erro ao buscar usuário:", err);
            return res.status(500).send({ msg: "Erro interno no servidor" });
        }

        if (result.length === 0) {
            return res.status(200).send({ msg: "Email não cadastrado" });
        }
        return res.status(200).send({ msg: "Em breve você receberá um link para redefinir sua senha" });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});