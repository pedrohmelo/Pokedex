"use client";

import { useEffect, useState } from "react";
import { getPokemonDetails, getPokemonList } from "@/src/api/api-teste";
import PokemonDetails from "@/src/components/cards/pokemon-details";

interface VideoGamesType {
  name: string;
  url: string;
}

export default function VideoGames() {
  const [pokemonList, setPokemonList] = useState<VideoGamesType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPokemonList();
        setPokemonList(data.results);
      } catch (error) {
        console.error("Error fetching pokemon list:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="px-4">
      <div>
        <h1>Pokemon List</h1>
        <ul>
          {pokemonList.map((pokemon, index) => (
            <li key={index}>{pokemon.name}</li>
          ))}
        </ul>
      </div>

      <div className="pt-10">
        <PokemonDetails />
      </div>
    </main>
  );
}
