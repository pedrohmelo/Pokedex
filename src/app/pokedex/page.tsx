"use client";

import { SetStateAction, useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";

import pokemonAPIFetch from "@/src/axios/config";
import PokeballImage from "@/public/images/pokeball8bits.webp";

const Pokedex = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonImage, setPokemonImage] = useState<string | null>(null);

  const getPokemonData = async () => {
    try {
      const response = await pokemonAPIFetch.get(`/pokemon/${pokemonName}`);

      const imageUrl = response.data.sprites.front_default;

      setPokemonImage(imageUrl);

      console.log(response);
    } catch (error) {
      console.log("ERRO", error);
    }
  };

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPokemonName(event.target.value);
  };

  return (
    <main className="px-4">
      <div className="flex gap-x-2">
        <Input
          type="search"
          placeholder="Pokemon Name"
          className="w-72"
          value={pokemonName}
          onChange={handleInputChange}
        />
        <Button
          className="flex gap-x-2 items-center justify-center"
          variant={"default"}
          onClick={getPokemonData}
        >
          <Image src={PokeballImage} alt="Pokeball Image" className="w-8" />
          Search
        </Button>
      </div>
      {pokemonImage !== null && (
        <div className="flex flex-col items-center">
          <Image
            src={pokemonImage}
            alt="Pokemon Image"
            width={200}
            height={200}
          />
          <div className="flex gap-x-4">
            <h1>Weight</h1>
            <h1>Height</h1>
            <h1>Type</h1>
          </div>
        </div>
      )}
    </main>
  );
};

export default Pokedex;
