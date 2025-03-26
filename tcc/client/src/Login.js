import './App.css'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const validationLogin = yup.object().shape({
  email: yup
    .string()
    .email("Não é um email")
    .required("Este campo é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("Este campo é obrigatório"),
});

const Login = () => {

  const [errorMessage, setErrorMessage] = React.useState("");

  const handleClickLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    })
    .then((response) => {
      console.log(response);
      setErrorMessage(""); 
      window.location.href = "/Receitas.html";
    })
    .catch((error) => {
      const message = error.response?.data?.msg || "Erro inesperado";
      setErrorMessage(message); 
    });
  };
  

  return (
    <div className="container">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <h1>Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleClickLogin}
        validationSchema={validationLogin}
      >
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="email" className="form-field" placeholder="Email" />
            <ErrorMessage component="span" name="email" className="form-error" />
          </div>

          <div className="login-form-group">
            <Field name="password" className="form-field" placeholder="Senha" type="password" />
            <ErrorMessage component="span" name="password" className="form-error" />
          </div>

          <div className='signup-link'>
            <p>Esqueceu a <Link to="/ForgotPassword">senha?</Link></p>
          </div>

          <button className="button" type="submit">Login</button>

          <div className='signup-link'>
            <p>Ainda não possui Cadastro? <Link to="/Cadastro">Cadastro</Link></p>
          </div>

        </Form>
      </Formik>
    </div>
  );
};

export default Login;
