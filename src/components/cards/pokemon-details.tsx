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

interface PokemonDetailsProps {
  pokemonName: string;
}

const PokemonDetails = ({ pokemonName }: PokemonDetailsProps) => {
  const [pokemonDetails, setPokemonDetails] =
    useState<PokemonDetailsType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPokemonDetails(pokemonName); // Use pokemonName recebido como prop
        setPokemonDetails(data);
      } catch (error) {
        console.error("Error fetching pokemon details: ", error);
      }
    };

    fetchData();
  }, [pokemonName]); // Adicionando pokemonName como dependência para que useEffect seja chamado quando ele mudar

  return (
    <main className="">
      <div>Pokemon CARD</div>

      {pokemonDetails && (
        <>
          <h1>Abilities:</h1>{" "}
          <ul>
            {pokemonDetails.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
};

export default PokemonDetails;
