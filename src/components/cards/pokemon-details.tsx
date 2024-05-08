import { getPokemonDetails } from "@/src/api/api-teste";
import { useState, useEffect } from "react";

interface AbilityType {
  ability: {
    name: string;
  };
}

interface PokemonDetailsType {
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

interface PokemonDetailsProps {
  pokemonName: string;
}

const PokemonDetails = ({ pokemonName }: PokemonDetailsProps) => {
  const [pokemonDetails, setPokemonDetails] =
    useState<PokemonDetailsType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPokemonDetails(pokemonName);
        setPokemonDetails(data);
      } catch (error) {
        console.error("Error fetching pokemon details: ", error);
      }
    };

    fetchData();
  }, [pokemonName]); // Adicionando pokemonName como dependência para que useEffect seja chamado quando ele mudar

  return (
    <main className="border">
      <div>Pokemon {pokemonName}</div>

      {pokemonDetails && (
        <div className="">
          <h1>Abilities:</h1>{" "}
          <ul>
            {pokemonDetails.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default PokemonDetails;
