import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../moviePages/MoviePage.css";
import "../moviePages/MoviePageDesktop.css";
import { FaStar } from "react-icons/fa";
import { series } from "../../mocks/dummyData";

const SeriePage = () => {
  const { serieId } = useParams();
  const [serieInfo, setSerieInfo] = useState(null);
  const [hoveredStarIndex, setHoveredStarIndex] = useState(-1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const serie = series.find((serie) => serie.id === parseInt(serieId));
    if (serie) {
      setSerieInfo(serie);
    }
  }, [serieId]);

  const handleStarHover = (index) => {
    setHoveredStarIndex(index);
  };

  const handleStarClick = (index) => {
    const newRating = index + 1;
    setRating(newRating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleEvaluate = () => {
    if (rating === 0 || comment === "") {
      alert("Por favor, dê uma nota e um comentário à série.");
    } else {
      console.log("Rating:", rating);
      console.log("Comment:", comment);
      setRating(0);
      setComment("");
      // Lógica para enviar avaliação
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleEvaluate();
    }
  };

  return (
    <div>
      {serieInfo ? (
        <>
          <main>
            <div className="single-movie-content">
              <div className="movie-container">
                <div className="moviePoster">
                  <img src={serieInfo.imagem} alt="Serie Poster" />
                </div>
                <div className="movieDesc">
                  <h1>{serieInfo.titulo}</h1>
                  <p className="text">{serieInfo.descricao}</p>
                  <p className="text">{serieInfo.diretor}</p>
                  <p className="text">{serieInfo.genero}</p>
                  <p className="text">
                    {serieInfo.pais}, {serieInfo.ano_lancamento}
                  </p>
                </div>
              </div>

              <div className="rating-container">
                <div className="movieRating">
                  <div className="r1">
                    <div className="rr2">
                      <div className="Stars">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            size={40}
                            onMouseEnter={() => handleStarHover(index)}
                            onMouseLeave={() => handleStarHover(-1)}
                            onClick={() => handleStarClick(index)}
                            color={
                              index <= hoveredStarIndex ? "#ffc107" : "#e4e5e9"
                            }
                            style={{ cursor: "pointer" }}
                          />
                        ))}
                        <p>Nota: {rating}</p>
                      </div>
                      <textarea
                        name="postContent"
                        rows={4}
                        cols={40}
                        value={comment}
                        onChange={handleCommentChange}
                        onKeyPress={handleKeyPress}
                        style={{ resize: "none" }}
                        maxLength={128}
                      />
                      <button onClick={handleEvaluate}>Avaliar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <h1 className="elenco">Elenco</h1>
          <p>
            {serieInfo.elenco && serieInfo.elenco.map((ator, index) => (
              <span key={index}>
                {ator}
                {index === serieInfo.elenco.length - 1 ? "." : ", "}
              </span>
            ))}
          </p>
          <hr />
        </>
      ) : (
        <p style={{ color: "white" }}>Carregando...</p>
      )}
    </div>
  );
};

export default SeriePage;
