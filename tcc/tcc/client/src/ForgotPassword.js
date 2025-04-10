import './App.css'
import React, { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const EsqueciSenha = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleForgotPassword = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/ForgotPassword", { email })
            .then((response) => {
                setMessage(response.data.msg);
            })
            .catch((error) => {
                setMessage("Erro ao tentar enviar o email");
            });
    };

    return (
        <div className="forgot-password-container">
            <h1>Esqueci minha senha</h1>
            <form onSubmit={handleForgotPassword}> {/* Substituí o Form por form */}
                <input
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Enviar</button>

                <div className='signup-link'>
                    <p>Voltar para <Link to="/Login">Login</Link></p>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EsqueciSenha;