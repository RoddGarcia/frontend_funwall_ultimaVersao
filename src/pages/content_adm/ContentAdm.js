import React, { useState } from "react";
import { FaRegTrashAlt, FaEdit, FaSave } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import "./contentAdm.css";
import { CookiesProvider, useCookies } from "react-cookie";
import { usuarios } from "../../mocks/dummyData";
import { movies } from "../../mocks/dummyData";
import dados from "../../mocks/dummy.json";

const ContentAdm = () => {
  const [tipoConteudo, setTipoConteudo] = useState("filmes");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  function gerarUUID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-4" +
      s4().substr(0, 3) +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  }

  const uuid = gerarUUID();

  console.log(dados);

  // Carrega conteúdo do Json
  const [conteudo, setConteudo] = useState({
    filmes: movies,
    series: [],
    livros: [],
    usuarios: usuarios,
  });

  const [novoItem, setNovoItem] = useState({ title: "", id: "" });
  const [editandoItem, setEditandoItem] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoItem({ ...novoItem, [name]: value });
  };
  // console.log(tipoConteudo);

  const adicionarItem = () => {
    const novaUUID = gerarUUID();

    if (tipoConteudo === "filmes") {
      const novoFilmeList = [...conteudo.filmes];
      const novoFilme = {
        id: novaUUID,
        name: novoItem.title,
        description: novoItem.description,
        rating: 0,
        director: novoItem.director,
      };

      novoFilmeList.push(novoFilme);

      setConteudo({
        ...conteudo,
        filmes: novoFilmeList,
      });

      setNovoItem({
        title: "",
        director: "",
        description: "",
      });
    } else if (tipoConteudo === "usuarios") {
      const novoUsuarioList = [...conteudo.usuarios];
      const novoUsuario = {
        id: novaUUID,
        name: novoItem.title,
      };
      novoUsuarioList.push(novoUsuario);

      setConteudo({
        ...conteudo,
        usuarios: novoUsuarioList,
      });

      setNovoItem({
        title: "",
      });
    } else {
      setConteudo({
        ...conteudo,
        [tipoConteudo]: [...conteudo[tipoConteudo], novoItem],
      });
      setNovoItem({ title: "" });
    }
  };

  const removerItem = (index) => {
    setConteudo({
      ...conteudo,
      [tipoConteudo]: conteudo[tipoConteudo].filter((_, i) => i !== index),
    });
  };

  const salvarEdicao = (index) => {
    const novoConteudo = { ...conteudo };
    // console.log(novoConteudo);
    novoConteudo[tipoConteudo][index] = novoItem;
    setConteudo(novoConteudo);
    setEditandoItem(null);
    setNovoItem({ title: "", id: "" });
    // console.log(novoConteudo);
  };

  const cancelarEdicao = () => {
    setEditandoItem(null);
    setNovoItem({ nome: "", id: "" });
  };

  const editarItem = (index) => {
    setNovoItem(conteudo[tipoConteudo][index]);
    setEditandoItem(index);
  };

  const isAdmin =
    cookies.user && cookies.user.username.toLowerCase() === "admin";

  const renderizarTabela = () => {
    return (
      <table className="tabela-conteudo">
        <thead>
          <tr>
            {tipoConteudo === "usuarios" ? (
              <>
                <th>Nome</th>
                <th>Código</th>
                <th>Senha</th>
              </>
            ) : (
              <>
                <th>Título</th>
                <th>ID</th>
                {tipoConteudo === "filmes" && (
                  <>
                    <th>Diretor</th>
                    <th>Descrição</th>
                  </>
                )}
              </>
            )}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {conteudo[tipoConteudo].map((item, index) => (
            <tr key={index}>
              <td>
                {editandoItem === index ? (
                  <input
                    type="text"
                    name="nome"
                    value={novoItem.nome}
                    onChange={handleInputChange}
                  />
                ) : (
                  item.username || item.title || item.name
                )}
              </td>
              <td>
                {editandoItem === index ? (
                  <input
                    type="text"
                    name="id"
                    value={novoItem.id}
                    onChange={handleInputChange}
                  />
                ) : (
                  item.id
                )}
              </td>
              {tipoConteudo === "usuarios" ? (
                <td>
                  {editandoItem === index ? (
                    <input
                      type="text"
                      name="senha"
                      value={novoItem.senha}
                      onChange={handleInputChange}
                    />
                  ) : (
                    item.senha
                  )}
                </td>
              ) : tipoConteudo === "filmes" ? (
                <>
                  <td>
                    {editandoItem === index ? (
                      <input
                        type="text"
                        name="director"
                        value={novoItem.director}
                        onChange={handleInputChange}
                      />
                    ) : (
                      item.director
                    )}
                  </td>
                  <td>
                    {editandoItem === index ? (
                      <input
                        type="text"
                        name="description"
                        value={novoItem.description}
                        onChange={handleInputChange}
                      />
                    ) : (
                      item.description
                    )}
                  </td>
                </>
              ) : null}
              <td className="act-bottons">
                {editandoItem === index ? (
                  <>
                    <button onClick={() => salvarEdicao(index)}>
                      <FaSave />
                    </button>
                    <button onClick={() => cancelarEdicao()}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => removerItem(index)}>
                      <FaRegTrashAlt />
                    </button>
                    <button onClick={() => editarItem(index)}>
                      <FaEdit />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="content-container">
      {isAdmin ? (
        <>
          <div className="categoria-container">
            <label htmlFor="categoria" style={{ color: "#fff854" }}>
              Categoria:
            </label>
            <select
              id="categoria"
              value={tipoConteudo}
              onChange={(e) => setTipoConteudo(e.target.value)}
            >
              <option value="filmes">Filmes</option>
              <option value="series">Séries</option>
              <option value="livros">Livros</option>
              <option value="usuarios">Usuários</option>
            </select>
          </div>
          <h1 style={{ color: "#fff854" }}>Lista de {tipoConteudo}</h1>
          <div className="add-form">
            <input
              type="text"
              name="title"
              placeholder="Nome"
              value={novoItem.nome}
              onChange={handleInputChange}
            />
            {tipoConteudo === "filmes" && (
              <>
                <input
                  type="text"
                  name="director"
                  placeholder="Diretor"
                  value={novoItem.director}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Descrição"
                  value={novoItem.description}
                  onChange={handleInputChange}
                />
              </>
            )}
            <button className="add-btn" onClick={adicionarItem}>
              <IoMdAddCircleOutline color="white" size={22} />
            </button>
          </div>
          {renderizarTabela()}
        </>
      ) : (
        <>
          <h1>
            Eu quando a morena me flagra tentando entrar na página de CRUD do
            admin sem estar logado como admin: kkkkk{" "}
          </h1>
          <img src="../../images/easter egg.jpeg" alt="Easter Egg" />
        </>
      )}
    </div>
  );
};

export default ContentAdm;
