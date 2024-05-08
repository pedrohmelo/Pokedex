"use client";

import { useEffect, useState } from "react";
import { getPokemonDetails, getPokemonList } from "@/src/api/api-teste";
import PokemonDetails from "@/src/components/cards/pokemon-details";

interface PokedexType {
  name: string;
  url: string;
}

export default function Pokedex() {
  const [pokemonList, setPokemonList] = useState<PokedexType[]>([]);
  const [selectedPokemonName, setSelectedPokemonName] = useState<string>("");

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

  const handlePokemonSelect = (name: string) => {
    setSelectedPokemonName(name);
  };

  return (
    <main className="px-4">
      <div>
        <h1>Pokemon List</h1>
        <ul>
          {pokemonList.map((pokemon, index) => (
            <li key={index} onClick={() => handlePokemonSelect(pokemon.name)}>
              {pokemon.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-10">
        {selectedPokemonName && (
          <PokemonDetails pokemonName={selectedPokemonName} />
        )}{" "}
        {/* Passa o nome do Pokémon selecionado para o componente PokemonDetails */}
      </div>
    </main>
  );
}
