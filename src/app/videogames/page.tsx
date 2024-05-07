"use client";

import { useEffect, useState } from "react";
import { getPokemonDetails, getPokemonList } from "@/src/api/api-teste";

interface VideoGamesType {
  name: string;
  url: string;
}

interface AbilityType {
  ability: {
    name: string;
  };
}

interface PokemonDetailsType {
  abilities: AbilityType[];
}

export default function VideoGames() {
  const [pokemonList, setPokemonList] = useState<VideoGamesType[]>([]);
  const [pokemonDetails, setPokemonDetails] =
    useState<PokemonDetailsType | null>(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPokemonDetails("pikachu");
        setPokemonDetails(data);
      } catch (error) {
        console.error("Error fetching pokemon details:", error);
      }
    };

    fetchData();
  }, []);

  console.log(pokemonDetails);
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
        <h2>Pokemon Details</h2>
        {pokemonDetails && (
          <ul>
            {pokemonDetails.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
