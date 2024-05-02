import axios from "axios";

const pokemonAPIFetch = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  headers: {
    "Content-Type": "application/json",
    algumacoisa: "teste",
  },
});

export default pokemonAPIFetch;
