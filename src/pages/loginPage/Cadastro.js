import React, { useState } from "react";
import "./Cadastrouser.css"; // Importe o arquivo de estilo correto
import { Link } from "react-router-dom";

function Cadastro() {
  return (
    <main className="cadastro-container">
      <div className="left-content">
        <img src="images/cadastro.jpg" alt="Imagem" />
      </div>
      <div className="right-content">
        <h1 className="cadastro-title">Cadastre-se</h1>
        <p className="cadastro-description">Crie uma nova conta.</p>
        <form className="cadastro-form" action="#">
          <div className="input-row">
            <div className="input-container-cad">
              <input
                type="text"
                id="fullname"
                className="input-field"
                placeholder="Nome Completo"
                required
              />
            </div>
            <div className="input-container-cad">
              <input
                type="text"
                id="username"
                className="input-field"
                placeholder="Username"
                required
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-container-cad">
              <input
                type="email"
                id="email"
                className="input-field"
                placeholder="Email"
                required
              />
            </div>
            <div className="input-container-cad">
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="Senha"
                required
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-container-cad">
              <input
                type="text"
                id="birthyear"
                className="input-field"
                placeholder="Ano de Nascimento"
                required
              />
            </div>
            <div className="input-container-cad">
              <input
                type="text"
                id="city"
                className="input-field"
                placeholder="Cidade"
                required
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-container-cad">
              <input
                type="text"
                id="state"
                className="input-field"
                placeholder="Estado"
                required
              />
            </div>
          </div>
          <button type="submit" className="cadastro-button">
            Cadastrar
          </button>
        </form>
        <p className="signup-text">
          Já tem uma conta? Faça <a href="/login">login</a>.
        </p>
      </div>
    </main>
  );
}

export default Cadastro;
