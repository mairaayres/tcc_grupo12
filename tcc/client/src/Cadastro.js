import './App.css'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const validationCadastro = yup.object().shape({
  email: yup
    .string()
    .email("Não é um email")
    .required("Este campo é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("Este campo é obrigatório"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], "As senhas não são iguais")
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("Este campo é obrigatório"),
});

const Cadastro = () => {
  const navigate = useNavigate(); 

  const handleClickCadastro = (values) => {
     Axios.post("http://localhost:3001/cadastro", {
      email: values.email,
      password: values.password,
    })
    .then((response) => {
      alert('Cadastro realizado com sucesso!');
      navigate("/Login");
    })
    .catch((error) => {
      const errorMessage = error.response?.data?.message || "Erro inesperado";
      alert('Ocorreu um erro: ' + errorMessage);
    });
  };
  
  return (
    <div className="container">
      <h1>Cadastro</h1>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        onSubmit={handleClickCadastro}
        validationSchema={validationCadastro}
      >
        <Form className="cadastro-form">
          <div className="cadastro-form-group">
            <Field name="email" className="form-field" placeholder="Email" />
            <ErrorMessage component="span" name="email" className="form-error" />
          </div>

          <div className="cadastro-form-group">
            <Field name="password" className="form-field" placeholder="Senha" type="password" />
            <ErrorMessage component="span" name="password" className="form-error" />
          </div>

          <div className="cadastro-form-group">
            <Field name="confirmPassword" className="form-field" placeholder="Confirme sua senha" type="password" />
            <ErrorMessage component="span" name="confirmPassword" className="form-error" />
          </div>

          <button className="button" type="submit">Cadastrar</button>

          <div className='signup-link'>
            <p>Já possui Cadastro? <Link to="/Login">Login</Link></p>
          </div>

        </Form>
      </Formik>
    </div>
  );
};

export default Cadastro;
