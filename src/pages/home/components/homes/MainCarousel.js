import React, { useState, useEffect } from "react";
import { Carousel } from "./Carousel";
import "./home.css";
import useFetch from "use-http";

// import useFetch from "use-http";
import { homeData } from "../../../../mocks/dummyData";
import { books } from "../../../../mocks/dummyData";
import { series } from "../../../../mocks/dummyData";
import { movies } from "../../../../mocks/dummyData";
// import axios from "axios";

export const MainCarousel = () => {
  const [items, setItems] = useState(homeData);
  const baseURL =
    "http://ec2-15-228-43-137.sa-east-1.compute.amazonaws.com:8080/filmes";
  // const baseURL = "https://mack-webmobile.vercel.app/api/users";
  const { get, response, del, put, error, loading } = useFetch(baseURL);
  const [filmes, setFilmes] = useState([]);

  // console.log(baseURL);
  // useEffect(() => {
  //   fetch(
  //     "http://ec2-15-228-43-137.sa-east-1.compute.amazonaws.com:8080/filmes"
  //   )
  //     .then((response) => console.log(response.json()))
  //     .then((data) => {
  //       console.log("Funcionou");
  //       setFilmes(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  // fetch("http://ec2-54-94-4-218.sa-east-1.compute.amazonaws.com/series", {
  //   method: "GET",
  //   mode: "cors",
  //   headers: {
  //     "Content-Type": "application/json",
  //     // Add any other headers as needed
  //   },
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log("Data received:", data);
  //     setFilmes(data);
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching data:", error);
  //   });

  // const makeAPICall = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://ec2-54-94-4-218.sa-east-1.compute.amazonaws.com/series",
  //       { mode: "cors" }
  //     );
  //     const data = await response.json();
  //     console.log({ data });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // useEffect(() => {
  //   makeAPICall();
  // }, []);

  // const buscar = async () => {
  //   const resp = await get();

  //   if (response.ok) {
  //     setFilmes(resp);
  //     console.log(filmes);
  //   } else {
  //     setFilmes([]);
  //   }
  // };
  // useEffect(() => {
  //   buscar();
  // }, []);

  return (
    <>
      <section className="home">
        <Carousel items={homeData} />
      </section>
    </>
  );
};

export default MainCarousel;
