"use client";

import { useState } from "react";

import pokemonAPIFetch from "@/src/axios/config";

const Pokedex = () => {
  const [pokemon, setPokemon] = useState([]);
  const getPokemonData = async () => {
    try {
      const TESTE = await pokemonAPIFetch.get("/pokemon/charizard");

      console.log(TESTE);
    } catch (error) {}
  };
  return (
    <main className="px-4">
      <div onClick={getPokemonData}>TESTE</div>
    </main>
  );
};

export default Pokedex;
