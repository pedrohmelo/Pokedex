import { getPokemonDetails } from "@/src/api/api-teste";
import { useState, useEffect } from "react";

interface AbilityType {
  ability: {
    name: string;
  };
}

interface PokemonDetailsType {
  abilities: AbilityType[];
}

const PokemonDetails = (pokemonName?: string) => {
  const [pokemonDetails, setPokemonDetails] =
    useState<PokemonDetailsType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPokemonDetails("pikachu");
        setPokemonDetails(data);
      } catch (error) {
        console.error("Error fetching pokemon details: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="px-4">
      <div>Pokemon CARD</div>

      {pokemonDetails && (
        <ul>
          {pokemonDetails.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default PokemonDetails;
