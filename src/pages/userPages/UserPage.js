import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./userPage.css";
import { useCookies } from "react-cookie";
import { usuarios } from "../../mocks/dummyData";

const UserPage = () => {
  const { userId } = useParams();
  const [cookies] = useCookies(["user"]);

  const userVer = cookies.user;
  const user = usuarios.find((user) => user.username === userId);
  const profileLog = userVer && userVer.username === userId;

  const [popupVisible, setPopupVisible] = useState(false);
  const [editing, setEditing] = useState(false); // State for tracking edit mode
  const [newAvatar, setNewAvatar] = useState(null); // State to hold new avatar image

  const userData = {
    followers: 100,
    reviews: 50,
    favorites: 20,
  };

  const moviesReviewed = [
    { title: "Filme 1", rating: 4.5, comment: "Excelente filme! Recomendo." },
    { title: "Filme 2", rating: 3.7, comment: "Belo trabalho de direção." },
    { title: "Filme 3", rating: 4.2, comment: "Um clássico moderno." },
    { title: "Filme 4", rating: 4.2, comment: "Um clássico moderno." },
    { title: "Filme 5", rating: 4.2, comment: "Coito Interrompido." },
    // Adicione mais filmes aqui, se necessário
  ];

  // Function to handle editing mode toggle
  const toggleEditing = () => {
    setEditing(!editing);
  };

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setNewAvatar(file);
  };

  // JSX for user info
  const userInfo = editing ? (
    <form>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      <input type="username" placeholder="Novo usuário" />
      <input type="password" placeholder="Nova Senha" />
    </form>
  ) : (
    <>
      <img src={user.avatar} alt="User Avatar" className="user-avatar" />
      <h1>{userId}</h1>
    </>
  );

  const profileButtons = profileLog ? (
    editing ? (
      <div className="edit-profile-button">
        <button onClick={toggleEditing}>Cancelar</button>
        <button>Salvar</button>
      </div>
    ) : (
      <div className="edit-profile-button">
        <button onClick={toggleEditing}>Editar Perfil</button>
      </div>
    )
  ) : null;

  return (
    <>
      <div className="user-info-container">{userInfo}</div>
      <div className="user-data-container">
        <div className="user-data">
          <h2 className="above-followers">{userData.followers}</h2>
          <p>Seguidores</p>
        </div>
        <div className="user-data">
          <h2 className="above-reviews">{userData.reviews}</h2>
          <p>Avaliações</p>
        </div>
        <div className="user-data">
          <h2 className="above-favorites">{userData.favorites}</h2>
          <p>Favoritos</p>
        </div>
      </div>
      {profileButtons}
      {/* Seção de Filmes Avaliados */}
      <div className="section">
        <h2>Filmes Avaliados</h2>
        <div className="cards-container">
          {moviesReviewed.map((movie, index) => (
            <div className="card" key={index}>
              <div className="placeholder"></div>
              <div className="comment">{movie.comment}</div>{" "}
              {/* Comentário do filme */}
            </div>
          ))}
        </div>
        <div className="movies-info">
          {moviesReviewed.map((movie, index) => (
            <div className="movie-info" key={index}>
              <h3>{movie.title}</h3> {/* Nome do filme */}
              <p>Avaliação: {movie.rating}</p> {/* Nota do filme */}
            </div>
          ))}
        </div>
      </div>
      {/* Seção de Séries Avaliadas */}
      {/* Seção de Livros Avaliados */}
    </>
  );
};

export default UserPage;
