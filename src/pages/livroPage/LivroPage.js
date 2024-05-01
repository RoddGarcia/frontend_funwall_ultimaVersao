import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../moviePages/MoviePage.css";
import "../moviePages/MoviePageDesktop.css";
import { FaStar } from "react-icons/fa";
import { books } from "../../mocks/dummyData";

const LivroPage = () => {
  const { livroId } = useParams();
  const [livroInfo, setLivroInfo] = useState(null);

  useEffect(() => {
    const livro = books.find((livro) => livro.id === livroId);
    if (livro) {
      setLivroInfo(livro);
    }
  }, [livroId]);

  return (
    <div>
      {livroInfo ? (
        <>
          <main>
            <div className="single-movie-content">
              <div className="movie-container">
                <div className="moviePoster">
                  <img src={livroInfo.imagem} alt="Capa do Livro" />
                </div>
                <div className="movieDesc">
                  <h1>{livroInfo.titulo}</h1>
                  <p className="text">Autor: {livroInfo.autor}</p>
                  <p className="text">Gênero: {livroInfo.genero}</p>
                  <p className="text">Editora: {livroInfo.editora}</p>
                  <p className="text">País: {livroInfo.pais}</p>
                  <p className="text">
                    Ano de Lançamento: {livroInfo.anoLancamento}
                  </p>
                </div>
              </div>
            </div>
          </main>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default LivroPage;
