"use client";

import { SetStateAction, useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";

import pokemonAPIFetch from "@/src/axios/config";
import PokeballImage from "@/public/images/pokeball8bits.webp";

const Pokedex = () => {
  const [pokemonFind, setPokemonFind] = useState("");
  const [pokemonImage, setPokemonImage] = useState<string | null>(null);
  const [pokemonType, setPokemonType] = useState<string[]>([]);
  const [pokemonWeight, setPokemonWeight] = useState<string>("");
  const [pokemonHeight, setPokemonHeight] = useState<string>("");
  const [pokemonName, setPokemonName] = useState<string>("");

  const getPokemonData = async () => {
    try {
      let response;
      if (pokemonFind === "") {
        response = await pokemonAPIFetch.get(`/pokemon/`);
      } else {
        response = await pokemonAPIFetch.get(`/pokemon/${pokemonFind}`);
      }

      const data = response.data;

      if (data.sprites && data.sprites.front_default) {
        setPokemonImage(data.sprites.front_default);
      }

      if (data.name) {
        setPokemonName(data.name);
      }

      if (data.types) {
        const types = data.types.map(
          (typeObject: { type: { name: string } }) => typeObject.type.name
        );
        setPokemonType(types);
      }

      if (data.weight) {
        setPokemonWeight(data.weight);
      }

      if (data.height) {
        setPokemonHeight(data.height);
      }

      console.log(response);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonFind(event.target.value);
  };

  return (
    <main className="px-4">
      <div className="flex gap-x-2">
        <Input
          type="search"
          placeholder="Pokemon Name"
          className="w-72"
          value={pokemonFind}
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
      {pokemonImage && (
        <div className="flex flex-col items-center">
          <Image
            src={pokemonImage}
            alt="Pokemon Image"
            width={200}
            height={200}
          />
          <h1>{pokemonName}</h1>

          <div className="flex gap-x-10">
            <div>
              <h1 className="font-medium">Types:</h1>
              {pokemonType.map((type, index) => (
                <p key={index}> {type}</p>
              ))}
            </div>

            <div className="flex flex-col">
              <h1 className="font-medium">Weight: </h1>
              <h1 className="font-normal">{pokemonWeight} Kgs</h1>
            </div>

            <div>
              <h1 className="font-medium">Height: </h1>
              <h1>{pokemonHeight} dm</h1>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Pokedex;
