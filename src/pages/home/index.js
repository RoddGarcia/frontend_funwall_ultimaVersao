import { useState, useEffect } from "react";
// import { movies } from "../../mocks/dummyData"; // dummydata para filmes
import { books } from "../../mocks/dummyData";
import { series } from "../../mocks/dummyData";
import { MainCarousel } from "./components/homes/MainCarousel";
import { PopularFilmes } from "./popular/PopularFilmes";
import { PopularBooks } from "./popular/PopularBooks";
import { PopularSeries } from "./popular/PopularSeries";
import useFetch from "use-http";
import Modal from "../../components/modal/Modal";
import GetData from "../../scripts/GetData";

export const HomePage = () => {

  const movies = GetData("filmes")

  console.log(movies)

  return (
    <>
      <MainCarousel />
      <PopularFilmes items={movies} title="Filmes Populares" />
      <PopularSeries items={series} title="Séries Populares" />
      <PopularBooks items={books} title="Livros Populares" />
      <Modal />
    </>
  );
};
